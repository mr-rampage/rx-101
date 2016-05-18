import DOMFactory from "./dom-factory";
import DataItemBuilder from "../../../test/js/utils/c+j-builders.js"
import $ from "jqlite/jqlite.min"

describe('DOMFactory', () => {
  it('should create a labelled text input', () => {
    const textItem = DataItemBuilder.withName('foo').withPrompt('label').withType('text').build();

    const actual = DOMFactory(textItem);
    expect(actual.tagName).toBe('LABEL');
    expect(actual.children.length).toBe(2);

    const label = actual.firstChild;
    expect(label.textContent).toBe('label');

    const textBox = actual.lastChild;
    expect(textBox.tagName).toBe('INPUT');
    expect(textBox.attributes.getNamedItem('type').value).toBe('text');
    expect(textBox.attributes.getNamedItem('name').value).toBe('foo');
  });
});
