import Rx from "rx/dist/rx.lite";

function createLogger(prefix) {
  return Rx.Observer.create(
    value => console.info(prefix, value),
    err => console.error(prefix, err),
    () => console.info(prefix, 'Complete')
  );
}

export default createLogger;
