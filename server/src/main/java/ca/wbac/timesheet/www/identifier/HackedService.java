package ca.wbac.timesheet.www.identifier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HackedService {
    private static final String WEB_SERVICE = "https://haveibeenpwned.com/api/v2/breachedaccount/";

    @Autowired
    private RestTemplate restTemplate;

    public Observable<List<String>> getBreachedSites(String identifier) {
        return Observable.create(observer -> {
            try {
                observer.onNext(getBreaches(identifier));
                observer.onCompleted();
            } catch (RestClientException e) {
                observer.onError(e);
            }
        });
    }

    private List<String> getBreaches(String identifier) {
        URI resource = createResource(identifier);
        ResponseEntity<List<Site>> response = makeRequest(resource);
        if (response.getStatusCode() == HttpStatus.OK && response.hasBody()) {
            return response.getBody().stream().map(Site::getName).collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    private ResponseEntity<List<Site>> makeRequest(URI queryUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON_UTF8));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(queryUri, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Site>>() {
        });
    }

    private URI createResource(String identifier) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(WEB_SERVICE)
                .path(identifier).queryParam("truncateResponse", "true");

        return uriBuilder.build().encode().toUri();
    }
}
