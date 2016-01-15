[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

This library allows you to embed [Bacon](https://github.com/baconjs/bacon.js)
observables into React Virtual DOM.

## Usage

Import the object of prelifted classes (default import) and other utilities you
need:

```jsx
import B, {set, toggle} from "bacon.react.html"
```

The prelifted classes can be accessed from the default import `B`.  The names of
the prelifted classes are the same as in `React.DOM`.

### Lifted classes

A lifted class eliminates Bacon observables that appear as attributes or direct
children of the produced element.  For example, using the lifted class
`B.input`, you could write

```jsx
const value = Bacon.Model("")
...
<B.input type="text"
         mount={c => c && c.focus()}
         value={value}
         onChange={set(value)}/>
```

where `value` refers to a [Bacon.Model](https://github.com/baconjs/bacon.model).

The `mount` attribute on a lifted element does the same thing as the ordinary
JSX `ref` attribute: JSX/React treats it as a special case, so it had to be
renamed.

### Nesting

A single lifted class, like `B.input` in the previous example, eliminates Bacon
observables only when they are immediately contained attributes or children of
the element.  So, you can safely nest lifted elements:

```jsx
const checked = Bacon.Model(false)
...
<B.div>
  <B.label htmlFor="likes-bacon">Bacon is tasty:</B.label>
  <B.input type="checkbox"
           id="likes-bacon"
           checked={checked}
           onChange={toggle(checked)}/>
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
           checked={checked}
           onChange={toggle(checked)}/>
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
