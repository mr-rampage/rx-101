package ca.wbac.timesheet.www.word;

import java.net.URI;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import rx.Observable;

@Service
public class OffensiveWordService {
	private static final String OFFENSIVE_WORD_SERVICE = "http://www.purgomalum.com/www/containsprofanity";

	@Autowired
	private RestTemplate restTemplate;

	public Observable<Boolean> containsOffensiveWords(String text) {
		return Observable.create(observer -> {
			try {
				observer.onNext(hasOffensiveWords(text));
				observer.onCompleted();
			} catch (RestClientException e) {
				observer.onError(e);
			}
		});
	}

	private Boolean hasOffensiveWords(String text) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.TEXT_PLAIN));
		HttpEntity<String> entity = new HttpEntity<>(headers);
		ResponseEntity<String> response = restTemplate.exchange(createOffensiveWordQuery(text), HttpMethod.GET, entity, String.class);
		return Boolean.parseBoolean(response.getBody());
	}
	
	private URI createOffensiveWordQuery(String text) {
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(OFFENSIVE_WORD_SERVICE)
				.queryParam("text", text)
				.queryParam("add", getAllOffensiveWords());
		
		return uriBuilder.build().encode().toUri();
	}

	private String getAllOffensiveWords() {
		return "poo,poop";
	}
}
