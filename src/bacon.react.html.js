import Bacon from "baconjs"
import React from "react"

// Helpers

export const classes = (...cs) => ({className: Bacon.combineWith(cs, function() {
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
})})

export const bind = template => ({...template, onChange: ({target}) => {
  for (const k in template)
    template[k].set(target[k])
}})

// Markup

const nullState = {dispose: null, combined: null}

const common = {
  getInitialState() {
    return nullState
  },
  tryDispose() {
    const {dispose} = this.state
    if (dispose)
      dispose()
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
    this.setState(nullState)
  }
}

const toProperty = obs =>
  obs instanceof Bacon.EventStream ? obs.toProperty() : obs

const FromBacon = React.createClass({
  ...common,
  trySubscribe({bacon}) {
    this.tryDispose()

    this.setState({dispose: toProperty(bacon).onValue(
      combined => this.setState({combined})
    )})
  },
  render() {
    return this.state.combined
  }
})

export const fromBacon = bacon =>
  React.createElement(FromBacon, {bacon})

const FromClass = React.createClass({
  ...common,
  trySubscribe({props}) {
    this.tryDispose()

    const vals = {}
    const obsKeys = []
    const obsStreams = []

    for (const key in props) {
      const val = props[key]
      const keyOut = "mount" === key ? "ref" : key
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
  render() {
    const {combined} = this.state
    return combined && React.createElement(this.props.Class,
                                           combined.props,
                                           combined.children)
  }
})

export const fromClass =
  Class => props => React.createElement(FromClass, {Class, props})

const liftAll = cs => {
  const lifted = {}
  for (let i=0, n=cs.length; i<n; ++i) {
    const c = cs[i]
    lifted[c] = fromClass(c)
  }
  return lifted
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
