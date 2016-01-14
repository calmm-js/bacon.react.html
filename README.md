[![npm version](https://badge.fury.io/js/bacon.react.html.svg)](http://badge.fury.io/js/bacon.react.html)

This library wraps a number of HTML elements with `Reify` from
[bacon.react](https://github.com/polytypic/bacon.react) for convenience.

For example, instead of

```jsx
import Reify from "bacon.react"

<Reify>
  <input type="text"
         value={value}
         onChange={e => value.set(e.target.value)}/>
</Reify>
```

you can write

```jsx
import {InputValue} from "bacon.react.html"

<InputValue type="text" value={value}/>
```

where `value` refers to a [Bacon.Model](https://github.com/baconjs/bacon.model).
