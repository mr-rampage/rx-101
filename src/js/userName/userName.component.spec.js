import Rx from "rx/dist/rx.lite";
import UserName from "./userName.component";
import DataItemBuilder from "../../../test/js/utils/c+j-builders";

describe('UserName Component', () => {
  let input, userName;

  beforeEach(() => {
    const userNameConfig = DataItemBuilder.withName('foo')
      .withPrompt('label').withType('text').build();

    const userNameComponent = UserName(userNameConfig);
    userNameComponent.stream.subscribe(value => userName = value);

    input = userNameComponent.view.find('input');
  });

  it('should default to blank for invalid input', () => {
    doKeyUpTest(undefined, '');
    doKeyUpTest('a', '');
  });

  it('should provide a userName for input greater than two characters', () => {
    doKeyUpTest('abc', 'abc');
  });

  function doKeyUpTest(inputValue, expectation) {
    input.val(inputValue);
    input.trigger('input');
    expect(userName).toBe(expectation);
  }
});
