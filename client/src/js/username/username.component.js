import Rx from "rx/dist/rx.all";
import componentUtils from "../utils/component-utils";
import domFactory from "../utils/dom-factory";
import usernameService from "./username.service";

function createUsernameComponent(config, scheduler) {
  const element = domFactory(config);

  const username = Rx.Observable
    .fromEvent(element.find('input'), 'input')
    .pluck('target', 'value')
    .startWith(config.value);

  const isAvailable = username
    .debounce(500, scheduler)
    .flatMapLatest(usernameService.isAvailable)
    .startWith(false);

  const usernameStream = Rx.Observable.zip(username, isAvailable)
    .map(results => {
      const [username, isAvailable] = results;
      return isAvailable ? username : '';
    })
    .distinctUntilChanged()
    .publish();

  componentUtils.markInvalidElement(element, usernameStream);

  return Object.freeze({
    stream: usernameStream,
    view: element
  });
}

export default createUsernameComponent;
