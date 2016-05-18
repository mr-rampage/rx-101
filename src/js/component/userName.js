import Rx from "rx/dist/rx.lite";
import DOMFactory from "../utils/dom-factory";

function createComponent(config) {
  const element = DOMFactory(config);

  const observable = Rx.Observable.fromEvent(element, 'keyup')
    .pluck('target', 'value')
    .map(text => text.length > 2 ? text : '')
    .distinctUntilChanged();

  return Object.freeze({
    stream: observable,
    view: element
  });
}

export default createComponent;
