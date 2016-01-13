import React from "react"
import Reify from "bacon.react"

export const classes = (...cs) => cs.filter(c => c).join(" ")

const prep = ({didMount, ...props}) => {
  if (didMount)
    props.ref = didMount
  return props
}

const set = value => e => value.set(e.target.value)
const toggle = checked => () => checked.modify(c => !c)

// Markup

export const A       = ps => <Reify><a       {...prep(ps)}/></Reify>
export const Article = ps => <Reify><article {...prep(ps)}/></Reify>
export const Button  = ps => <Reify><button  {...prep(ps)}/></Reify>
export const Div     = ps => <Reify><div     {...prep(ps)}/></Reify>
export const I       = ps => <Reify><i       {...prep(ps)}/></Reify>
export const Input   = ps => <Reify><input   {...prep(ps)}/></Reify>
export const LI      = ps => <Reify><li      {...prep(ps)}/></Reify>
export const Main    = ps => <Reify><main    {...prep(ps)}/></Reify>
export const Option  = ps => <Reify><option  {...prep(ps)}/></Reify>
export const Small   = ps => <Reify><small   {...prep(ps)}/></Reify>
export const Span    = ps => <Reify><span    {...prep(ps)}/></Reify>
export const TBody   = ps => <Reify><tbody   {...prep(ps)}/></Reify>
export const TD      = ps => <Reify><td      {...prep(ps)}/></Reify>
export const UL      = ps => <Reify><ul      {...prep(ps)}/></Reify>

// Controls

export const InputChecked = ({checked, ...ps}) =>
  <Input checked={checked} onChange={toggle(checked)} {...prep(ps)}/>

export const InputValue = ({value, ...ps}) =>
  <Input value={value} onChange={set(value)} {...prep(ps)}/>

export const Select = ({value, ...ps}) => <Reify>
    <select value={value} onChange={set(value)} {...prep(ps)}/>
  </Reify>

export const Textarea = ({value, ...ps}) => <Reify>
    <textarea value={value} onChange={set(value)} {...prep(ps)}/>
  </Reify>
