import React from "react"
import Reify from "bacon.react"

export const classes = (...cs) => cs.filter(c => c).join(" ")

const prep = ({didMount, ...props}) => {
  if (didMount)
    props.ref = didMount
  return props
}

// Markup

export const A       = ps => <Reify><a       {...prep(ps)}/></Reify>
export const Article = ps => <Reify><article {...prep(ps)}/></Reify>
export const Button  = ps => <Reify><button  {...prep(ps)}/></Reify>
export const Div     = ps => <Reify><div     {...prep(ps)}/></Reify>
export const I       = ps => <Reify><i       {...prep(ps)}/></Reify>
export const LI      = ps => <Reify><li      {...prep(ps)}/></Reify>
export const Main    = ps => <Reify><main    {...prep(ps)}/></Reify>
export const Option  = ps => <Reify><option  {...prep(ps)}/></Reify>
export const Small   = ps => <Reify><small   {...prep(ps)}/></Reify>
export const Span    = ps => <Reify><span    {...prep(ps)}/></Reify>
export const TBody   = ps => <Reify><tbody   {...prep(ps)}/></Reify>
export const TD      = ps => <Reify><td      {...prep(ps)}/></Reify>
export const UL      = ps => <Reify><ul      {...prep(ps)}/></Reify>

// Controls

export const CheckboxInput = ({checked, ...ps}) => <Reify>
    <input type="checkbox"
           checked={checked}
           onChange={() => checked.modify(c => !c)}
           {...prep(ps)}/>
  </Reify>

export const Select = ({value, ...ps}) => <Reify>
    <select value={value}
            onChange={e => value.set(e.target.value)}
            {...prep(ps)}/>
  </Reify>

export const TextArea = ({value, ...ps}) => <Reify>
    <textarea type="text"
              value={value}
              onChange={e => value.set(e.target.value)}
              {...prep(ps)}/>
  </Reify>

export const TextInput = ({value, ...ps}) => <Reify>
    <input type="text"
           value={value}
           onChange={e => value.set(e.target.value)}
           {...prep(ps)}/>
  </Reify>
