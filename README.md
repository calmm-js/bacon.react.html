[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

This library allows you to embed [Bacon](https://github.com/baconjs/bacon.js)
streams into React Virtual DOM.

## Usage

Import the elements and other utilities you need, e.g.

```jsx
import {set, toggle, Div, Input, Label, P} from "bacon.react.html"
```

and you can then use them like ordinary HTML elements, but with Bacon streams in
attributes or as children.  For example, you could write

```jsx
const value = Bacon.Model("")
...
<Input type="text"
       mount={c => c && c.focus()}
       value={value}
       onChange={set(value)}/>
```

where `value` refers to a [Bacon.Model](https://github.com/baconjs/bacon.model)
and `mount` does the same thing as `ref`: JSX/React treats it as a special case,
so it had to be renamed.

A single lifted element, like `Input` above, lifts Bacon streams only when they
are immediately contained attributes or children.  So, you can safely nest
lifted elements:

```jsx
const checked = Bacon.Model(false)
...
<Div>
  <Label htmlFor="likes-bacon">Bacon is tasty</Label>
  <Input type="checkbox"
         id="likes-bacon"
         checked={checked}
         onChange={toggle(checked)}/>
  <P hidden={checked}>Are you sure?</P>
</Div>
```

Note, however, that *only* those elements that immediately contain streams must
be lifted, because React will choke on plain Bacon.  So, the above could also
have been written as:

```jsx
const checked = Bacon.Model(false)
...
<div>
  <label htmlFor="likes-bacon">Bacon is tasty</label>
  <Input type="checkbox"
         id="likes-bacon"
         checked={checked}
         onChange={toggle(checked)}/>
  <P hidden={checked}>Are you sure?</P>
</div>
```

For best performance this latter version is preferable.

## Lifting

If you need a lifted version of an element that is not already lifted, you can
write:

```jsx
import {lift} from "bacon.react.html"
...
const Special = lift("special")
```

## Longer examples

* [TodoMVC](https://github.com/polytypic/atomi-todomvc)
