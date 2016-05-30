import componentUtils from "./component-utils";
import Rx from "rx/dist/rx.lite";
import $ from "cash-dom/dist/cash.min";

describe('ComponentUtils', () => {
  function doInvalidComponentObserverTest(element, value) {
    componentUtils.markInvalidElement(element, Rx.Observable.just(value));
  }

  it('should add the invalid class to an element', () => {
    const element = $('<div>');

    doInvalidComponentObserverTest(element, false);
    expect(element.hasClass('invalid')).toBeTruthy();
  });

  it('should remove the invalid class to an element', () => {
    const element = $('<div>').addClass('invalid');

    doInvalidComponentObserverTest(element, true);
    expect(element.hasClass('invalid')).toBeFalsy();
  });
});
