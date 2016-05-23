package ca.wbac.timesheet.observer;

import static org.hamcrest.Matchers.is;

import org.junit.Assert;

public class BooleanObserver implements rx.Observer<Boolean> {
	
	private Boolean expected;
	
	public BooleanObserver(Boolean expected) {
		this.expected = expected;
	}
	
	@Override
	public void onCompleted() {
		
	}

	@Override
	public void onError(Throwable arg0) {
		
	}

	@Override
	public void onNext(Boolean actual) {
		Assert.assertThat(actual, is(expected));
	}

}
