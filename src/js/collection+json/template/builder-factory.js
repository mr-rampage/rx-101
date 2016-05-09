function builderFactory() {  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function validatePart(product, part, value, rules) {
    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        if (typeof rule === 'function' && rule(value)) {
          throw `Validation failure for property ${part} with value ${value}`;
        } else if (typeof rule === 'string' && !!product[rule]) {
      	  throw `Conflict detected for property ${part} with property ${rule}`;
        }
      });
    }
  }

  function buildPart(product, part, ...rules) {
    this['with' + capitalize(part)] = (value) => {
      validatePart(product, part, value, rules)
      product[part] = value;
      return this;
    }
  }

  function construct(required, optional) {
    let builder = {};
    let product = {};
    required.concat(optional).forEach((components) => {
      buildPart.apply(builder, [product].concat(components));
    });
    builder.build = () => product;
    return builder;
  }

  return Object.freeze(construct.apply(null, arguments));
}
