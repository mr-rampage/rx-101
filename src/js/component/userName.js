import Rx from "rx-dom-events/rx.dom.events";
import DOMFactory from "./dom-factory"

function createComponent(name, value) {
  let _userName;

  let template = `<input type="text" name="${name}" value="${value}"/>`;
  let element = DOMFactory(template);

  let observable = Rx.DOM.keyup(element)
    .pluck('target', 'value')
    .filter(text => text.length > 2);

  let observer = Rx.Observer.create(
    userName => _userName = userName,
    err => _userName = ''
  );

  observable.subscribe(observer);

  return {
    stream: observable,
    view: element
  };
}

export default createComponent;
