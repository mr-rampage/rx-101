package ca.wbac.timesheet.username;

import rx.Observable;

public interface UsernameService {
    Observable<Boolean> isValid(String username);
}
