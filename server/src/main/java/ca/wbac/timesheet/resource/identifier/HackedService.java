package ca.wbac.timesheet.resource.identifier;

import rx.Observable;

import java.util.List;

public interface HackedService {
    Observable<List<String>> getBreachedSites(String identifier);

    Observable<Boolean> isSafeIdentifier(String identifier);
}
