import React from "react"
import Reify from "bacon.react"

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

const renameDidMountToRef = ({didMount, ...ps}) => {
  ps.ref = didMount
  return ps
}

const prep = ps => "didMount" in ps ? renameDidMountToRef(ps) : ps

export const lift = tag => ps =>
  React.createElement(Reify, null, React.createElement(tag, prep(ps)))

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
