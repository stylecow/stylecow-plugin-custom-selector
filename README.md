stylecow plugin custom-selector
===============================

[![Build Status](https://travis-ci.org/stylecow/stylecow-plugin-custom-selector.svg)](https://travis-ci.org/stylecow/stylecow-plugin-custom-selector)

Stylecow plugin to work with the @custom-selector at-rule, [available in CSS Media Queries Level 4](http://dev.w3.org/csswg/css-extensions/#custom-selectors).

You write:

```css
@custom-selector --heading h1, h2, h3, h4, h5, h6;
@custom-selector --main-world strong.main;
 
body --heading --main-world {
	color: blue;
}
```

And stylecow converts to:

```css
body :matches(h1, h2, h3, h4, h5, h6) strong.main {
	color: blue;
}
```

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-custom-selector/tree/master/tests/cases)
