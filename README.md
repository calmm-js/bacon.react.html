[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

This library allows you to embed [Bacon](https://github.com/baconjs/bacon.js)
streams into React Virtual DOM.

## Usage

Import the element object (default import) and other utilities you need:

```jsx
import B, {set, toggle} from "bacon.react.html"
```

The lifted elements can be accessed from the default import.  The names of the
lifted elements are the same as in React.DOM.

For example, you could write

```jsx
const value = Bacon.Model("")
...
<B.input type="text"
         mount={c => c && c.focus()}
         value={value}
         onChange={set(value)}/>
```

where `value` refers to a [Bacon.Model](https://github.com/baconjs/bacon.model)
and `mount` does the same thing as `ref`: JSX/React treats it as a special case,
so it had to be renamed.

A single lifted element, like `B.input` above, lifts Bacon streams only when
they are immediately contained attributes or children.  So, you can safely nest
lifted elements:

```jsx
const checked = Bacon.Model(false)
...
<B.div>
  <B.label htmlFor="likes-bacon">Bacon is tasty</B.label>
  <B.input type="checkbox"
           id="likes-bacon"
           checked={checked}
           onChange={toggle(checked)}/>
  <B.p hidden={checked}>Are you sure?</B.p>
</B.div>
```

Note, however, that *only* those elements that immediately contain streams must
be lifted, because React will choke on plain Bacon.  So, the above could also
have been written as:

```jsx
const checked = Bacon.Model(false)
...
<div>
  <label htmlFor="likes-bacon">Bacon is tasty</label>
  <B.input type="checkbox"
           id="likes-bacon"
           checked={checked}
           onChange={toggle(checked)}/>
  <B.p hidden={checked}>Are you sure?</B.p>
</div>
```

For best performance this latter version is preferable.

## Lifting and Patching

If you need a lifted version of an element that is not already lifted, you can
write:

```jsx
import B, {lift} from "bacon.react.html"
...
B.special = lift("special")
```

## Longer examples

* [TodoMVC](https://github.com/polytypic/atomi-todomvc)
