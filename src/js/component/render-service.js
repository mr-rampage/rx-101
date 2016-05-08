import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";
import createElement from "virtual-dom/create-element";
import Rx from "rx/dist/rx";

function RenderService(viewObservable, parentNode) {
  let view = null;
  let rootNode = null;
  let baseNode = parentNode || document.body;

  function initialize(newView) {
    view = newView;
    rootNode = createElement(view);
    baseNode.appendChild(rootNode);
  }

  function update(newView) {
    let patches = diff(view, newView);
    rootNode = patch(rootNode, patches);
    view = newView;
  }

  let viewObserver = Rx.Observer.create(
    newView => view ? update(newView) : initialize(newView),
    error => console.warn('Error occured along Observable chain', error),
    () => console.info('Done rendering')
  );

  return viewObservable.subscribe(viewObserver);
}

export default RenderService;
