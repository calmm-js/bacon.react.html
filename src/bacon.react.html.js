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

export const A              = lift("a")
export const Abbr           = lift("abbr")
export const Address        = lift("address")
export const Area           = lift("area")
export const Article        = lift("article")
export const Aside          = lift("aside")
export const Audio          = lift("audio")
export const B              = lift("b")
export const Base           = lift("base")
export const Bdi            = lift("bdi")
export const Bdo            = lift("bdo")
export const Big            = lift("big")
export const Blockquote     = lift("blockquote")
export const Body           = lift("body")
export const Br             = lift("br")
export const Button         = lift("button")
export const Canvas         = lift("canvas")
export const Caption        = lift("caption")
export const Cite           = lift("cite")
export const Code           = lift("code")
export const Col            = lift("col")
export const Colgroup       = lift("colgroup")
export const Data           = lift("data")
export const Datalist       = lift("datalist")
export const Dd             = lift("dd")
export const Del            = lift("del")
export const Details        = lift("details")
export const Dfn            = lift("dfn")
export const Dialog         = lift("dialog")
export const Div            = lift("div")
export const Dl             = lift("dl")
export const Dt             = lift("dt")
export const Em             = lift("em")
export const Embed          = lift("embed")
export const Fieldset       = lift("fieldset")
export const Figcaption     = lift("figcaption")
export const Figure         = lift("figure")
export const Footer         = lift("footer")
export const Form           = lift("form")
export const H1             = lift("h1")
export const H2             = lift("h2")
export const H3             = lift("h3")
export const H4             = lift("h4")
export const H5             = lift("h5")
export const H6             = lift("h6")
export const Head           = lift("head")
export const Header         = lift("header")
export const Hgroup         = lift("hgroup")
export const Hr             = lift("hr")
export const Html           = lift("html")
export const I              = lift("i")
export const Iframe         = lift("iframe")
export const Img            = lift("img")
export const Input          = lift("input")
export const Ins            = lift("ins")
export const Kbd            = lift("kbd")
export const Keygen         = lift("keygen")
export const Label          = lift("label")
export const Legend         = lift("legend")
export const Li             = lift("li")
export const Link           = lift("link")
export const Main           = lift("main")
export const Map            = lift("map")
export const Mark           = lift("mark")
export const Menu           = lift("menu")
export const Menuitem       = lift("menuitem")
export const Meta           = lift("meta")
export const Meter          = lift("meter")
export const Nav            = lift("nav")
export const Noscript       = lift("noscript")
export const Object         = lift("object")
export const Ol             = lift("ol")
export const Optgroup       = lift("optgroup")
export const Option         = lift("option")
export const Output         = lift("output")
export const P              = lift("p")
export const Param          = lift("param")
export const Picture        = lift("picture")
export const Pre            = lift("pre")
export const Progress       = lift("progress")
export const Q              = lift("q")
export const Rp             = lift("rp")
export const Rt             = lift("rt")
export const Ruby           = lift("ruby")
export const S              = lift("s")
export const Samp           = lift("samp")
export const Script         = lift("script")
export const Section        = lift("section")
export const Select         = lift("select")
export const Small          = lift("small")
export const Source         = lift("source")
export const Span           = lift("span")
export const Strong         = lift("strong")
export const Style          = lift("style")
export const Sub            = lift("sub")
export const Summary        = lift("summary")
export const Sup            = lift("sup")
export const Table          = lift("table")
export const Tbody          = lift("tbody")
export const Td             = lift("td")
export const Textarea       = lift("textarea")
export const Tfoot          = lift("tfoot")
export const Th             = lift("th")
export const Thead          = lift("thead")
export const Time           = lift("time")
export const Title          = lift("title")
export const Tr             = lift("tr")
export const Track          = lift("track")
export const U              = lift("u")
export const Ul             = lift("ul")
export const Var            = lift("var")
export const Video          = lift("video")
export const Wbr            = lift("wbr")
export const Circle         = lift("circle")
export const Clippath       = lift("clipPath")
export const Defs           = lift("defs")
export const Ellipse        = lift("ellipse")
export const G              = lift("g")
export const Image          = lift("image")
export const Line           = lift("line")
export const LinearGradient = lift("linearGradient")
export const Mask           = lift("mask")
export const Path           = lift("path")
export const Pattern        = lift("pattern")
export const Polygon        = lift("polygon")
export const Polyline       = lift("polyline")
export const RadialGradient = lift("radialGradient")
export const Rect           = lift("rect")
export const Stop           = lift("stop")
export const Svg            = lift("svg")
export const Text           = lift("text")
export const Tspan          = lift("tspan")
