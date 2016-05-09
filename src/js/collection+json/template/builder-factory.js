function builderFactory() {  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

  function buildPart(product, part, ...conflicts) {
    this['with' + capitalize(part)] = (value) => {
      if (Array.isArray(conflicts) && conflicts.some((key) => !!product[key])) {
        throw `Conflict detected for property ${part} with one of properties ${conflicts}`;
      }
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
