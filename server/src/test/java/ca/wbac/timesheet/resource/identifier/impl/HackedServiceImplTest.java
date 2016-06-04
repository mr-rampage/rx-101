package ca.wbac.timesheet.resource.identifier.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class HackedServiceImplTest {
    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private HackedServiceImpl hackedServiceImpl;

    @Test
    public void testGetBreachedSites_withIdentifier_returnsList() {
        ResponseEntity response = ResponseEntity.ok(Arrays.asList(new Site("foo")));
        when(restTemplate.exchange(any(URI.class), eq(HttpMethod.GET), any(HttpEntity.class), any(ParameterizedTypeReference.class))).thenReturn(response);

        hackedServiceImpl.getBreachedSites("username")
                .subscribe(breachedSites -> {
                    List<String> expected = Arrays.asList("foo");
                    assertThat(breachedSites, equalTo(expected));
                });
    }
}
