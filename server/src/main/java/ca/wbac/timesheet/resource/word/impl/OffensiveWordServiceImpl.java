package ca.wbac.timesheet.resource.word.impl;

import ca.wbac.timesheet.resource.word.OffensiveWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import rx.Observable;

import java.net.URI;
import java.util.Collections;

@Service
public class OffensiveWordServiceImpl implements OffensiveWordService {
	private static final String WEB_SERVICE = "http://resource.purgomalum.com/resource/containsprofanity";

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public Observable<Boolean> containsOffensiveWords(String text) {
		return Observable.create(observer -> {
			try {
				observer.onNext(isOffensive(text));
				observer.onCompleted();
			} catch (RestClientException e) {
				observer.onError(e);
			}
		});
	}

	private Boolean isOffensive(String text) {
		URI resource = createResource(text);
		ResponseEntity response = makeRequest(resource);
		if (response.getStatusCode() == HttpStatus.OK && response.hasBody()) {
			ResponseEntity<String> stringResponse = (ResponseEntity<String>) response;
			return Boolean.parseBoolean(stringResponse.getBody());
		} else {
			return null;
		}
	}

	private ResponseEntity makeRequest(URI resource) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.TEXT_PLAIN));
		HttpEntity<String> entity = new HttpEntity<>(headers);
		return restTemplate.exchange(resource, HttpMethod.GET, entity, String.class);
	}
	
	private URI createResource(String text) {
		UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(WEB_SERVICE)
				.queryParam("text", text).queryParam("add", getAllOffensiveWords());
		
		return uriBuilder.build().encode().toUri();
	}

	private String getAllOffensiveWords() {
		return "poo,poop";
	}
}
