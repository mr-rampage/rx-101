package ca.wbac.timesheet.resource.identifier.impl;

import ca.wbac.timesheet.resource.identifier.HackedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import rx.Observable;
import rx.subjects.AsyncSubject;

import java.net.URI;
import java.util.concurrent.TimeUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HackedServiceImpl implements HackedService {
    private static final String WEB_SERVICE = "https://haveibeenpwned.com/api/v2/breachedaccount/";
    private static final int ALLOWABLE_BREACHES = 5;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Observable<Boolean> isSafeIdentifier(String identifier) {
        Observable<List<String>> breachedSites = getBreachedSites(identifier);
        return breachedSites.map(sites -> sites.size() <= ALLOWABLE_BREACHES).delay(1, TimeUnit.SECONDS);
    }

    @Override public Observable<List<String>> getBreachedSites(String identifier) {
        AsyncSubject<List<String>> subject = AsyncSubject.create();
        try {
            subject.onNext(getBreaches(identifier));
            subject.onCompleted();
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                subject.onNext(new ArrayList<>());
                subject.onCompleted();
            } else {
                subject.onError(e);
            }
        }
        return subject;
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
