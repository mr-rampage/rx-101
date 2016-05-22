import Rx from "rx/dist/rx.lite";
import Username from "./username.component";
import DataItemBuilder from "../../../test/js/utils/c+j-builders";

describe('Username Component', () => {
  let input, username;

  beforeEach(() => {
    const usernameConfig = DataItemBuilder.withName('foo')
      .withPrompt('label').withType('text').build();

    const usernameComponent = Username(usernameConfig);
    usernameComponent.stream.subscribe(value => username = value);

    input = usernameComponent.view.find('input');
  });

  it('should default to blank for invalid input', () => {
    doKeyUpTest(undefined, '');
    doKeyUpTest('a', '');
  });

  it('should provide a username for input greater than two characters', () => {
    doKeyUpTest('abc', 'abc');
  });

  function doKeyUpTest(inputValue, expectation) {
    input.val(inputValue);
    input.trigger('input');
    expect(username).toBe(expectation);
  }
});
