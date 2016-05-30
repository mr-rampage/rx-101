import Rx from "rx/dist/rx.lite";

function markInvalidElement(element, observable) {
  const invalidObserver = Rx.Observer.create(
    value => value ? element.removeClass('invalid') : 
        element.addClass('invalid')
  );

  observable.subscribe(invalidObserver);
}

const componentUtils = Object.freeze({
  markInvalidElement: markInvalidElement
});

export default componentUtils;
