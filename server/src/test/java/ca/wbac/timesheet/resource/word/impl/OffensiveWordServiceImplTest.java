package ca.wbac.timesheet.resource.word.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OffensiveWordServiceImplTest {
    @Mock
    RestTemplate restTemplate;

    @InjectMocks
    OffensiveWordServiceImpl offensiveWordServiceImpl;

    @Test
    public void testContainsOffensiveWord_withNonOffensiveWord_returnsTrue() {
        ResponseEntity<String> response = ResponseEntity.ok("true");
        when(restTemplate.exchange(any(URI.class), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class))).thenReturn(response);

        offensiveWordServiceImpl.containsOffensiveWords("foo")
                .subscribe(isOffensive -> {
                    assertThat(isOffensive, equalTo(Boolean.TRUE));
                });
    }

    @Test
    public void testContainsOffensiveWord_withWord_returnsNull() {
        ResponseEntity response = ResponseEntity.notFound().build();
        when(restTemplate.exchange(any(URI.class), eq(HttpMethod.GET), any(HttpEntity.class), eq(String.class))).thenReturn(response);

        offensiveWordServiceImpl.containsOffensiveWords("foo")
                .subscribe(isOffensive -> {
                    assertThat(isOffensive, nullValue());
                });
    }
}
