import builderFactory from "./builder-factory"

let dataItemBuilder = builderFactory(
  ['name', 'type'],
  [
    ['value', 'array', 'object'],
    ['array', 'value', 'object'],
    ['object', 'array', 'value'],
    'prompt',
    ['render', value => value !== 'image' && value !== 'link'],
    'title'
  ]
);

export default dataItemBuilder;
