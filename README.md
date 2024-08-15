# RYZE Digital Select Replace

![Run linter(s) workflow status](https://github.com/ryze-digital/select-replace/actions/workflows/run-lint.yml/badge.svg)

## Install

```sh
npm i @ryze-digital/select-replace
```

## Usage

### Scss

```scss
@use "@ryze-digital/select-replace";
```

Use the provided `configure` mixin to define your select replace defaults. A complete list of all possible configurations can
be found in [/src/styles/_config.scss](src/styles/_config.scss).

```scss
@include select-replace.configure(...);
```

There are seperate mixins for the replaced select and the option list.

```scss
.select-replace {
    @include select-replace.fake-select();
}

.option-list {
    @include select-replace.option-list();
}
```

For accessibility reasons we do not simply hide the original `<select>` field, because it should remain focusable.
Therefore, our JavaScript adds a class called `visually-hidden` to it after it is initialized. To visually hide elements
that should still be usable by screen readers, we have a mixin in our
[scss-utilities](https://github.com/ryze-digital/scss-utilities) called [visually-hidden](https://github.com/ryze-digital/scss-utilities/blob/main/src/_accessibility.scss#L10).
You could either use it to create a utility class with it ...

```Scss
.visually-hidden {
    @include scss-utilities.visually-hidden();
}
```

... or you can use it to only hide `<select>` fields, if you don't like global classes.

```Scss
select {
    @include scss-utilities.visually-hidden();
}
```

### JavaScript

```js
import { SelectReplace } from '@ryze-digital/select-replace';
```

```js
new SelectReplace({...}).init();
```

## Demos

Checkout this repository and use the [/demos](/demos) folder as document root to see a running demo in the browser.

- [Single select](/demos/single-select.html)
- [Multiple select](/demos/multiple-select.html)
- [Multiple select fields](/demos/multiple-select-fields.html)
- [Programmatic control](/demos/programmatic-control.html)
- [Option list appended to custom container](/demos/option-list-appended-to-custom-container.html)