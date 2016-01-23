import B, * as Base from "bacon.react.base"
import Bacon from "baconjs"

// Helpers

function classesImmediate() {
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

export const classes = (...cs) =>
  ({className: (cs.find(c => c instanceof Bacon.Observable)
                ? Bacon.combineWith(cs, classesImmediate)
                : classesImmediate(...cs))})

export const bind = template => ({...template, onChange: ({target}) => {
  for (const k in template)
    template[k].set(target[k])
}})

// Lifting

export const fromBacon = Base.fromBacon
export const fromClass = Base.fromClass
export const fromClasses = Base.fromClasses

// DOM

;["a", "abbr", "address", "area", "article", "aside", "audio",
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
  "wbr"].forEach(c => B[c] = fromClass(c))

export default B
