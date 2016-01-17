[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

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
`set` method such as a [Bacon.Model](https://github.com/baconjs/bacon.model):

```jsx
const settable = Bacon.Model("")
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

`classes(...)` extends to an object of the form `{className: observable}`.

### Nesting

A single lifted class, like `B.input`, eliminates Bacon observables only when
they are immediately contained attributes or children of the element.  So, you
can safely nest lifted elements:

```jsx
const checked = Bacon.Model(false)
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
const checked = Bacon.Model(false)
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

If you need a lifted version of a class that is not already lifted, you can use
`fromClass`:

```jsx
import B, {fromClass} from "bacon.react.html"
...
B.special = fromClass("special")
```

### From Bacon

`fromClass` and the prelifted classes handle the cases where the class of the
element is statically known or the element is a child of some element.  In case
the class of a top-most element depends on a Bacon observable, one can use
`fromBacon`:

```jsx
import {fromBacon} from "bacon.react.html"
...
const choice = Bacon.Model(false)
...
fromBacon(choice.map(c => c ? <True/> : <False/>))
```

That's all folks!

## Longer examples

* [TodoMVC](https://github.com/polytypic/atomi-todomvc)
