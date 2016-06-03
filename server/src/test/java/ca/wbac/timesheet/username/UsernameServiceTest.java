package ca.wbac.timesheet.username;

import static org.mockito.Mockito.when;

import ca.wbac.timesheet.www.word.OffensiveWordService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import ca.wbac.timesheet.observer.BooleanObserver;
import rx.Observable;

@RunWith(MockitoJUnitRunner.class)
public class UsernameServiceTest {

	@Mock
	private OffensiveWordService offensiveWordService;

	@InjectMocks
	private UsernameService usernameService;

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
		Observable<Boolean> observable = usernameService.isValid(username);
		observable.subscribe(verifyIsExpected);
	}
	
	private void mockOffensiveWordService(String text, Boolean result) {
		when(offensiveWordService.containsOffensiveWords(text)).thenReturn(Observable.just(result));
	}
}
