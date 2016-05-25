import Rx from "rx/dist/rx.lite";
import 'whatwg-fetch';

function isAvailable(username) {
  return isValid(username) ? Rx.Observable.fromPromise(
    fetch(`/api/username/${username}?isValid`)
      .then(response => response.text()) 
      .then(isValid => isValid === 'true')
  ) : Rx.Observable.just(false);
}

function isValid(username) {
  return !!username && username.length > 2 && username.length < 33;
}

const usernameService = {
  isAvailable: isAvailable
};

export default usernameService;
