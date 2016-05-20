import componentObserverFactory from "./component-observer.factory";
import Rx from "rx/dist/rx.lite";
import $ from "cash-dom/dist/cash.min";

describe('ComponentObserverFactory', () => {

  function doInvalidComponentObserverTest(element, predicate) {
    Rx.Observable.just(true)
      .subscribe(componentObserverFactory
         .createInvalidComponentObserver(element, predicate)
      );
  }

  it('should add the invalid class to an element', () => {
    const element = $('<div>');
    const falsy = () => false;

    doInvalidComponentObserverTest(element, falsy);
    expect(element.hasClass('invalid')).toBeTruthy();
  });

  it('should remove the invalid class to an element', () => {
    const element = $('<div>').addClass('invalid');
    const truthy = () => true;

    doInvalidComponentObserverTest(element, truthy);
    expect(element.hasClass('invalid')).toBeFalsy();
  });
});
