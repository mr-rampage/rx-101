package ca.wbac.timesheet.username.impl;

import ca.wbac.timesheet.observer.BooleanObserver;
import ca.wbac.timesheet.resource.word.OffensiveWordService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import rx.Observable;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UsernameServiceTest {

	@Mock
	private OffensiveWordService offensiveWordService;

	@InjectMocks
	private UsernameServiceImpl usernameServiceImpl;

	@Test
	public void shouldRejectEmptyUsername() {
		doIsValidTest(null, Boolean.FALSE);
		doIsValidTest("", Boolean.FALSE);
	}
	
	@Test
	public void shouldRejectShortOrLongUsername() {
		String shortName = new String(new char[2]).replace("\0", "o");
		String longName = new String(new char[33]).replace("\0", "o");
		doIsValidTest(shortName, Boolean.FALSE);
		doIsValidTest(longName, Boolean.FALSE);
	}
	
	@Test
	public void shouldRejectNonAlphanumericUsername() {
		doIsValidTest("$#*@#%&*()", Boolean.FALSE);
	}
	
	@Test
	public void shouldRejectOffensiveUsername() {
		String username = "BadWord";
		mockOffensiveWordService(username, Boolean.FALSE);
		doIsValidTest(username, Boolean.FALSE);
	}
	
	private void doIsValidTest(String username, Boolean expected) {
		BooleanObserver verifyIsExpected = new BooleanObserver(expected);
		Observable<Boolean> observable = usernameServiceImpl.isValid(username);
		observable.subscribe(verifyIsExpected);
	}
	
	private void mockOffensiveWordService(String text, Boolean result) {
		when(offensiveWordService.containsOffensiveWords(text)).thenReturn(Observable.just(result));
	}
}
