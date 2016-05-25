import Rx from "rx/dist/rx.all";
import DOMFactory from "../utils/dom-factory";
import usernameService from "./username.service";

function createUsernameComponent(config) {
  const element = DOMFactory(config);

  const username = Rx.Observable
    .fromEvent(element.find('input'), 'input')
    .pluck('target', 'value')
    .startWith(config.value);

  const isAvailable = username
    .debounce(500)
    .flatMapLatest(usernameService.isAvailable)
    .startWith(false);

  const usernameStream = Rx.Observable.combineLatest(username, isAvailable)
    .map((results) => {
      const [username, isAvailable] = results;
      return isAvailable ? username : ''
    })
    .distinctUntilChanged();

  return Object.freeze({
    stream: usernameStream,
    view: element
  });
}

export default createUsernameComponent;
