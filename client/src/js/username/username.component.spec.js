import Rx from "rx/dist/rx.all";
import usernameFactory from "./username.component";
import DataItemBuilder from "../../../test/js/utils/c+j-builders";
import usernameService from "./username.service";

describe('Username Component', () => {
  let input;
  let username;

  const scheduler = new Rx.TestScheduler(0);

  beforeEach(() => {
    spyOn(usernameService, 'isAvailable').and.callFake(() => {
      return Rx.Observable.just(true);
    });
  });

  beforeEach(() => {
    const observer = Rx.Observer.create(
      value => {
        username = value;
      },
      e => console.warn(e),
      () => console.info('done')
    );
    const usernameConfig = DataItemBuilder.withName('foo')
      .withPrompt('label').withType('text').build();

    const usernameComponent = usernameFactory(usernameConfig, scheduler);
    usernameComponent.stream.subscribe(observer);
    usernameComponent.stream.connect();

    input = usernameComponent.view.find('input');
  });

  it('should default to blank for invalid input', () => {
    doKeyUpTest(undefined, '');
    doKeyUpTest(null, '');
  });

  it('should set the username for valid input after debounce', done => {
    doKeyUpTest('abcddd', '');
    scheduler.scheduleAbsolute(null, 100, () => {
      expect(usernameService.isAvailable).not.toHaveBeenCalled();
      expect(username).toBe('');
    });
    scheduler.scheduleAbsolute(null, 1000, () => {
      expect(usernameService.isAvailable).toHaveBeenCalled();
      expect(username).toBe('abcddd');
      scheduler.stop();
      done();
    });
    scheduler.start();
  });

  function doKeyUpTest(inputValue, expectation) {
    input.val(inputValue);
    input.trigger('input');
    expect(username).toBe(expectation);
  }
});
