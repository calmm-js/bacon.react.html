import Bacon from "baconjs"
import React from "react"

// Helpers

export function classes() {
  let result = ""
  for (let i=0, n=arguments.length; i<n; ++i) {
    const a = arguments[i]
    if (a) {
      if (result)
        result += " "
      result += a
    }
  }
  return result
}

export const set = value => e => value.set(e.target.value)
export const toggle = checked => () => checked.modify(c => !c)

// Markup

const Reify = React.createClass({
  getInitialState() {
    return {}
  },
  tryDispose() {
    const {dispose} = this.state
    if (dispose) {
      dispose()
      this.replaceState({})
    }
  },
  trySubscribe({$props}) {
    this.tryDispose()

    const vals = {}
    const obsKeys = []
    const obsStreams = []

    for (const key in $props) {
      const val = $props[key]
      let keyOut = key
      if ("mount" === key)
        keyOut = "ref"
      if (val instanceof Bacon.Observable) {
        obsKeys.push(keyOut)
        obsStreams.push(val)
      } else if ("children" === key &&
                 val instanceof Array &&
                 val.find(c => c instanceof Bacon.Observable)) {
        obsKeys.push(keyOut)
        obsStreams.push(Bacon.combineAsArray(val))
      } else {
        vals[keyOut] = val
      }
    }

    this.setState({dispose: Bacon.combineAsArray(obsStreams).onValue(obsVals => {
      const props = {}
      let children = null
      for (const key in vals) {
        const val = vals[key]
        if ("children" === key) {children = val} else {props[key] = val}
      }
      for (let i=0, n=obsKeys.length; i<n; ++i) {
        const key = obsKeys[i]
        const val = obsVals[i]
        if ("children" === key) {children = val} else {props[key] = val}
      }
      this.setState({combined: {props, children}})
    })})
  },
  componentWillReceiveProps(nextProps) {
    this.trySubscribe(nextProps)
  },
  componentWillMount() {
    this.trySubscribe(this.props)
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.combined !== this.state.combined
  },
  componentWillUnmount() {
    this.tryDispose()
  },
  render() {
    const {combined} = this.state
    return (combined ? React.createElement(this.props.$tag,
                                           combined.props,
                                           combined.children)
            : null)
  }
})

export const lift =
  $tag => $props => React.createElement(Reify, {$tag, $props})

const liftAll = elems => {
  const result = {}
  for (let i=0, n=elems.length; i<n; ++i) {
    const elem = elems[i]
    result[elem] = lift(elem)
  }
  return result
}

export default liftAll([
  "a", "abbr", "address", "area", "article", "aside", "audio",
  "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button",
  "canvas", "caption", "circle", "cite", "clipPath", "code", "col", "colgroup",
  "data", "datalist", "dd", "defs", "del", "details", "dfn", "dialog", "div", "dl", "dt",
  "ellipse", "em", "embed",
  "fieldset", "figcaption", "figure", "footer", "form",
  "g",
  "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html",
  "i", "iframe", "image", "img", "input", "ins",
  "kbd", "keygen",
  "label", "legend",
  "li", "line", "linearGradient", "link",
  "main", "map", "mark", "mask", "menu", "menuitem", "meta", "meter",
  "nav", "noscript",
  "object", "ol", "optgroup", "option", "output",
  "p", "param", "path", "pattern", "picture", "polygon", "polyline", "pre", "progress",
  "q",
  "radialGradient", "rect", "rp", "rt", "ruby",
  "s", "samp", "script", "section", "select", "small", "source", "span", "stop", "strong", "style", "sub", "summary", "sup", "svg",
  "table", "tbody", "td", "text", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tspan",
  "u", "ul",
  "var", "video",
  "wbr"])
