function domFactory(template) {
  var parser = new DOMParser();
  return parser.parseFromString(template, "text/html").firstChild;
}

export default domFactory;
