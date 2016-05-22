import Rx from "rx/dist/rx.lite";
import DOMFactory from "../utils/dom-factory";
import componentObserverFactory from "../component/component-observer.factory"

function createUsernameComponent(config) {
  const element = DOMFactory(config);
  const isValidUserName = username => !!username && username.length > 2;

  const usernameObservable = Rx.Observable.fromEvent(element.find('input'), 'input')
    .pluck('target', 'value')
    .map(username => isValidUserName(username) ? username : '')
    .distinctUntilChanged();

  const invalidUserNameObserver = componentObserverFactory
    .createInvalidComponentObserver(element, isValidUserName);

  usernameObservable.subscribe(invalidUserNameObserver);

  return Object.freeze({
    stream: usernameObservable,
    view: element
  });
}

export default createUsernameComponent;
