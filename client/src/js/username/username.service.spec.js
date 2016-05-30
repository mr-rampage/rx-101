import Rx from "rx/dist/rx.lite";
import usernameService from "./username.service"
import 'whatwg-fetch';

describe('usernameService', () => {
  let promiseHelper;

  beforeEach(() => {
    const fakePromise = new Promise((resolve, reject) => {
      promiseHelper = { resolve: resolve, reject: reject };
    });
    spyOn(window, 'fetch').and.returnValue(fakePromise); 
  });

  it('should return false for an falsy username', () => {
    const expected = Rx.Observable.just(false);

    expect(usernameService.isAvailable()).toEqual(expected);
    expect(usernameService.isAvailable(null)).toEqual(expected);
    expect(usernameService.isAvailable('')).toEqual(expected);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('should return false for a short username', () => {
    const expected = Rx.Observable.just(false);

    expect(usernameService.isAvailable('a')).toEqual(expected);
    expect(usernameService.isAvailable('ab')).toEqual(expected);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('should return false for a long username', () => {
    const expected = Rx.Observable.just(false);

    expect(usernameService.isAvailable('a'.repeat(33))).toEqual(expected);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('should query a valid username', () => {
    let actual;
    promiseHelper.resolve(new Response('true'));
    usernameService.isAvailable('Fred Flintstone')
      .subscribe((response) => actual = response);
    expect(window.fetch).toHaveBeenCalledWith('/api/username/Fred Flintstone?isValid');
    expect(actual, true);
  });

});
