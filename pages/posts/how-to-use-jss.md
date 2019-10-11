`jss.createStyleSheet([styles], [options])`

options:

- `media` - media query - attribute of style element.
- `meta` - meta-information about this style - attribute of style element, e.g., you could pass component name for easier debugging.
- `link` - link jss Rule instances with DOM CSSRule instances so that styles, can be modified dynamically, false by default because it has some performance cost.
- `element` - style element otherwise will create one by default.
- `index` - 0 by default - determines DOM rendering order, higher number = higher specificity (inserted after).
- `generateId` - a function that generates a unique class name.
- `classNamePrefix` - a string, which gets added at the beginning of the class name.
