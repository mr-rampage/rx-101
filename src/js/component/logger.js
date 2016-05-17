import Rx from "rx/dist/rx.lite";

function createLogger() {
  return Rx.Observer.create(
    value => console.info(value),
    err => console.error(err),
    () => console.info('Complete')
  );
}

export default createLogger;
