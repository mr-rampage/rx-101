package ca.wbac.timesheet.resource.word;

import rx.Observable;

public interface OffensiveWordService {
    Observable<Boolean> containsOffensiveWords(String text);
}
