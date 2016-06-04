package ca.wbac.timesheet.username.impl;

import ca.wbac.timesheet.resource.word.OffensiveWordService;
import ca.wbac.timesheet.username.UsernameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rx.Observable;

import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

@Service
class UsernameServiceImpl implements UsernameService {

	@Autowired
	private OffensiveWordService offensiveWordService;

	public Observable<Boolean> isValid(String username) {
		if (StringUtils.isEmpty(username) || isOutOfRange(username) || !isAlphanumeric(username)) {
			return Observable.just(Boolean.FALSE);
		} else {
			return Observable.combineLatest(
				isAvailable(username), 
				offensiveWordService.containsOffensiveWords(username),
				(isAvailable, isOffensive) -> isAvailable && !isOffensive);
		}
	}

	private Observable<Boolean> isAvailable(String username) {
		return Observable.<Boolean>create(observer -> {
			observer.onNext(Boolean.TRUE);
			observer.onCompleted();
		}).delay(1, TimeUnit.SECONDS);
	}

	private boolean isOutOfRange(String username) {
		return (username.length() < 3) || (username.length() > 32);
	}

	private boolean isAlphanumeric(String username) {
		return Pattern.matches("^[a-zA-Z0-9]*$", username);
	}

}
