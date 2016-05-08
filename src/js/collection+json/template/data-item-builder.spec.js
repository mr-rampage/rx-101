import {default as templateDataItemBuilder} from './data-item-builder.js';

describe('TemplateDataItemBuilder', () => {
  it('should build a template data item', () => {
    let dataItem = templateDataItemBuilder()
      .withName('foo')
      .withValue('bar')
      .build();

    expect(dataItem).toEqual({name: 'foo', value: 'bar'});
  });

  it('should require a name', () => {
    let dataItem = templateDataItemBuilder().build();
    expect(dataItem).toBe(null);
  });

  it('should have one of value, array, or object', () => {
    let dataItem = templateDataItemBuilder()
      .withName('foo')
      .withValue('bar')
      .withArray([])
      .withObject({})
      .build();
    expect(dataItem).toEqual({name: 'foo', object: {}});
    dataItem = templateDataItemBuilder()
      .withName('foo')
      .withValue('bar')
      .withObject({})
      .withArray([])
      .build();
    expect(dataItem).toEqual({name: 'foo', array: []});
    dataItem = templateDataItemBuilder()
      .withName('foo')
      .withArray([])
      .withObject({})
      .withValue('bar')
      .build();
    expect(dataItem).toEqual({name: 'foo', value: 'bar'});
  });

  it('should render images or links only', () => {
    let dataItem = templateDataItemBuilder()
      .withName('foo')
      .withRender('bar')
      .build();
    expect(dataItem.render).toEqual(undefined);
    dataItem = templateDataItemBuilder()
      .withName('foo')
      .withRender('image')
      .build();
    expect(dataItem.render).toEqual('image');
    dataItem = templateDataItemBuilder()
      .withName('foo')
      .withRender('link')
      .build();
    expect(dataItem.render).toEqual('link');
  });
});
