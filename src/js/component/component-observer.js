import Rx from "rx/dist/rx.lite";

function createInvalidComponentObserver(element, isValid) {
  return Rx.Observer.create(
    value => {
      if (isValid.call(null, value)) {
        element.removeClass('invalid');
      } else {
        element.addClass('invalid');
      }
  });
}

const componentObserverFactory = Object.freeze({
  createInvalidComponentObserver: createInvalidComponentObserver
});

export default componentObserverFactory;
