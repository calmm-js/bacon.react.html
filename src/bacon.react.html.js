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

export const A        = lift("a")
export const Article  = lift("article")
export const Button   = lift("button")
export const DD       = lift("dd")
export const DL       = lift("dl")
export const DT       = lift("dt")
export const Div      = lift("div")
export const Em       = lift("em")
export const Footer   = lift("footer")
export const H1       = lift("h1")
export const H2       = lift("h2")
export const H3       = lift("h3")
export const I        = lift("i")
export const Input    = lift("input")
export const LI       = lift("li")
export const Main     = lift("main")
export const Option   = lift("option")
export const P        = lift("p")
export const Progress = lift("progress")
export const Section  = lift("section")
export const Select   = lift("select")
export const Small    = lift("small")
export const Span     = lift("span")
export const Strong   = lift("strong")
export const TBody    = lift("tbody")
export const TD       = lift("td")
export const TFoot    = lift("tfoot")
export const THead    = lift("thead")
export const TR       = lift("tr")
export const Table    = lift("table")
export const Textarea = lift("textarea")
export const UL       = lift("ul")
