# RYZE Digital Select Replace

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
- [Programmatic control](/demos/programmatic-control.html)
- [Option list appended to custom container](/demos/option-list-appended-to-custom-container.html)