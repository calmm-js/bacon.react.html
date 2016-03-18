[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html) [![Build Status](https://travis-ci.org/calmm-js/bacon.react.html.svg?branch=master)](https://travis-ci.org/calmm-js/bacon.react.html) [![](https://david-dm.org/calmm-js/bacon.react.html.svg)](https://david-dm.org/calmm-js/bacon.react.html) [![](https://david-dm.org/calmm-js/bacon.react.html/dev-status.svg)](https://david-dm.org/calmm-js/bacon.react.html#info=devDependencies) [![Gitter](https://img.shields.io/gitter/room/calmm-js/chat.js.svg?style=flat-square)](https://gitter.im/calmm-js/chat)

This library allows you to embed [Bacon](https://github.com/baconjs/bacon.js)
observables into React Virtual DOM.

## Usage

The prelifted classes can be accessed from the default import:

```jsx
import B from "bacon.react.html"
```

The names of the prelifted classes are the same as in `React.DOM`.

### Lifted classes

A lifted class eliminates Bacon observables that appear as attributes or direct
children of the produced element.  For example, using the lifted class `B.div`,
you could write

```jsx
<B.div>Hello, {observable}!</B.div>
```

where `observable` refers to a Bacon observable.  The resulting `div` always
shows the latest value produced by the observable.

### Mount attribute

The `mount` attribute on a lifted element

```jsx
<B.input mount={c => c && c.focus()}/>
```

does the same thing as the ordinary JSX `ref` attribute: JSX/React treats it as
a special case, so it had to be renamed.

### Bind attribute template

The `bind` attribute template

```jsx
import {bind} from "bacon.react.html"
```

can be used to bind an attribute, e.g. `value` or `checked`, to an object with a
`set` method such as a [Bacon.Atom](https://github.com/calmm-js/bacon.atom):

```jsx
const settable = Atom("")
...
<B.input type="text"
         mount={c => c && c.focus()}
         {...bind({value: settable})}/>
```

`bind` extends the given object, above `{value: settable}`, with an `onChange`
attribute containing a function that copies the attribute, above `value`, from
the event target to the attribute object, above `settable`.

### Classes attribute template

The `classes` attribute template

```jsx
import {classes} from "bacon.react.html"
```

offers a way to specify `className` with conditional content depending on
observables.  For example:

```jsx
...
<B.div {...classes("unconditional",
                   condition && "conditional",
                   condition ? "true" : "false",
                   observable.map(c => c && "conditional-and-observable"))}>
    Not too classy?</B.div>
```

`classes(...)` extends to an object of the form `{className: string |
observable}`.

### Nesting

A single lifted class, like `B.input`, eliminates Bacon observables only when
they are immediately contained attributes or children of the element.  So, you
can safely nest lifted elements:

```jsx
const checked = Atom(false)
...
<B.div>
  <B.label htmlFor="likes-bacon">Bacon is tasty:</B.label>
  <B.input type="checkbox"
           id="likes-bacon"
           {...bind({checked})}/>
  <B.div hidden={checked}><B.em>Are you sure?</B.em></B.div>
</B.div>
```

Note, however, that *only* those elements that immediately contain observables
must be lifted, because React will choke on plain Bacon.  So, the above could
also have been written as:

```jsx
const checked = Atom(false)
...
<div>
  <label htmlFor="likes-bacon">Bacon is tasty:</label>
  <B.input type="checkbox"
           id="likes-bacon"
           {...bind({checked})}/>
  <B.div hidden={checked}><em>Are you sure?</em></B.div>
</div>
```

For best performance this latter version is preferable.

### Lifting and Patching

If you need a lifted version of a HTML class that is not already lifted, you can
use `fromClass`:

```jsx
import B, {fromClass} from "bacon.react.html"
...
B.special = fromClass("special")
```

There is also `fromClasses` that lifts an object of classes to an object of
lifted classes.  For example, given

```jsx
import {fromClasses} from "bacon.react.html"
...
const L = fromClasses({Some, Custom, Classes})
```

then `L.Some`, `L.Custom` and `L.Classes` are lifted versions of `Some`,
`Custom` and `Classes`.

### From Bacon

`fromClass` and the prelifted classes handle the cases where the class of the
element is statically known or the element is a child of some element.  In case
the class of a top-most element depends on a Bacon observable, one can use
`fromBacon`:

```jsx
import {fromBacon} from "bacon.react.html"
...
const choice = Atom(false)
...
fromBacon(choice.map(c => c ? <True/> : <False/>))
```

### Combining properties

For notational convenience, the default import

```jsx
import B from "bacon.react.html"
```

is also a generalized hybrid of
[Bacon.combineTemplate](https://github.com/baconjs/bacon.js/#bacon-combinetemplate)
and [Bacon.combineWith](https://github.com/baconjs/bacon.js/#bacon-combinewith)
with
[.skipDuplicates](https://github.com/baconjs/bacon.js/#observable-skipduplicates)([R.equals](http://ramdajs.com/0.19.0/docs/#equals)).

The meaning of `B` can be described as

```jsx
B(fn)(x1, ..., xN) === B(fn, x1, ..., xN)
B(fn, x1, ..., xN) === combine(lift(fn), lift(x1), ..., lift(xN))
B(x1, ..., xN, fn) === combine(lift(x1), ..., lift(xN), lift(fn))
```

where

```jsx
const lift = x =>
  x && (x.constructor === Object || x.constructor === Array)
  ? Bacon.combineTemplate(x)
  : x
```

and

``` jsx
const combine = (...ps) =>
  Bacon.combineWith(...ps).skipDuplicates(R.equals)
```

In other words, `B(fn)` effectively lifts the given function `fn` to operate on
templates of observables.  `B(fn, x1, ..., xN)` and `B(x1, ..., xN, fn)`, where
`N >= 1`, is a generalization of `Bacon.combineWith` where arguments are
templates of observables.  Finally, duplicates are removed from the resulting
property based on deep structural equality.

That's all folks!

## Longer examples

* [TodoMVC](https://github.com/calmm-js/bacon.react.atom-todomvc)
