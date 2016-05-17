import Rx from "rx-dom-events/rx.dom.events";
import DOMFactory from "./dom-factory"

function createComponent(name, value) {
  let template = `<input type="text" name="${name}" value="${value}"/>`;
  let element = DOMFactory(template);

  let observable = Rx.DOM.keyup(element)
    .pluck('target', 'value')
    .filter(text => text.length > 2);

  return {
    stream: observable,
    view: element
  };
}

export default createComponent;
