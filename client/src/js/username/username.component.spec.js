import Rx from "rx/dist/rx.all";
import Username from "./username.component";
import DataItemBuilder from "../../../test/js/utils/c+j-builders";
import usernameService from "./username.service"

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

  it('should default to blank for valid input before debounce', () => {
    doKeyUpTest('abcddd', '');
  });

  function doKeyUpTest(inputValue, expectation) {
    input.val(inputValue);
    input.trigger('input');
    expect(username).toBe(expectation);
  }
});
