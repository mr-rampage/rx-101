import DOMFactory from "./dom-factory";
import DataItemBuilder from "../../../test/js/utils/c+j-builders.js"
import $ from "jqlite/jqlite.min"

describe('DOMFactory', () => {
  let view;

  beforeEach(() => {
    const textItem = DataItemBuilder.withName('foo')
      .withPrompt('label')
      .withType('text')
      .build();

    view = DOMFactory(textItem);
  });

  it('should create a labeled element', () => {
    expect(view.prop('tagName')).toBe('LABEL');
    expect(view.children().length).toBe(2);
  });

  it('should have a label', () => {
    const label = view.children().first();
    expect(label.text()).toBe('label');
  });

  it('should have a text input', () => {
    const textBox = view.children().last();
    expect(textBox.prop('tagName')).toBe('INPUT');
    expect(textBox.attr('type')).toBe('text');
    expect(textBox.attr('name')).toBe('foo');
  });
});
