import B, * as Base from "bacon.react.base"
import Bacon from "baconjs"

// Helpers

const classesImmediate = cs => {
  let result = ""
  for (let i=0, n=cs.length; i<n; ++i) {
    const a = cs[i]
    if (a) {
      if (result)
        result += " "
      result += a
    }
  }
  return result
}

//

export const classes = (...cs) =>
  ({className: (cs.find(c => c instanceof Bacon.Observable)
                ? B(cs, classesImmediate)
                : classesImmediate(cs))})

//

export const setProps = template => {
  let dispose = null
  return e => {
    if (dispose) {
      dispose()
      dispose = null
    }
    if (e) {
      dispose = Bacon.combineTemplate(template).subscribe(ev => {
        if (ev.hasValue()) {
          const template = ev.value()
          for (const k in template)
            e[k] = template[k]
        } else if (ev.isError()) {
          config.onError(ev.error)
        } else {
          dispose = null
        }
      })
    }
  }
}

export const getProps = template => ({target}) => {
  for (const k in template)
    template[k].set(target[k])
}

export const bindProps = ({ref, mount, ...template}) =>
  ({[ref && "ref" || mount && "mount"]: setProps(template),
    [ref || mount]: getProps(template)})

export const bind = template =>
  ({...template, onChange: getProps(template)})

// Export from Base

export const fromBacon = Base.fromBacon
export const fromClass = Base.fromClass
export const fromClasses = Base.fromClasses
export const fromIds = Base.fromIds
export const config = Base.config

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
