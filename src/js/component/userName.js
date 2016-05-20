import Rx from "rx/dist/rx.lite";
import DOMFactory from "../utils/dom-factory";
import componentObserverFactory from "./component-observer"

function createUserNameComponent(config) {
  const element = DOMFactory(config);
  const isValidUserName = userName => !!userName && userName.length > 2;

  const userNameObservable = Rx.Observable.fromEvent(element.find('input'), 'input')
    .pluck('target', 'value')
    .map(userName => isValidUserName(userName) ? userName : '')
    .distinctUntilChanged();

  const invalidUserNameObserver = componentObserverFactory
    .createInvalidComponentObserver(element, isValidUserName);

  userNameObservable.subscribe(invalidUserNameObserver);

  return Object.freeze({
    stream: userNameObservable,
    view: element
  });
}

export default createUserNameComponent;
