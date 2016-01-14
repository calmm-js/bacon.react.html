[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

This library wraps a number of HTML elements with `Reify` from
[bacon.react](https://github.com/polytypic/bacon.react) for convenience.

For example, instead of

```jsx
import Reify from "bacon.react"

<Reify>
  <input type="text"
         ref={c => c && c.focus()}
         value={value}
         onChange={e => value.set(e.target.value)}/>
</Reify>
```

you can write

```jsx
import {set, Input} from "bacon.react.html"

<Input type="text"
       didMount={c => c && c.focus()}
       value={value}
       onChange={set(value)}/>
```

where `value` refers to a [Bacon.Model](https://github.com/baconjs/bacon.model).

## Longer examples

* [TodoMVC](https://github.com/polytypic/atomi-todomvc)
