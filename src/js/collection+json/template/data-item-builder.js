function templateDataItemBuilder() {
  let product = {};
  let builder = {
    withName: name => {
      product.name = name;
      return builder;
    },
    withValue: value => {
      delete product.array;
      delete product.object;
      product.value = value;
      return builder;
    },
    withArray: array => {
      delete product.value;
      delete product.object;
      product.array = array;
      return builder;
    },
    withObject: object => {
      delete product.array;
      delete product.object;
      product.object = object;
      return builder;
    },
    withPrompt: label => {
      product.prompt = label;
      return builder;
    },
    withRender: render => {
      product.render = (render === 'image' || render === 'link') ?
        render : undefined;
      return builder;
    },
    withTitle: title => {
      product.title = title;
      return builder;
    },
    build: () => {
      return product.name ? product : null;
    }
  };
  return builder;
}

export default templateDataItemBuilder;
