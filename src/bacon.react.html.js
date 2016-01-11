import React from "react";
import Reify from "bacon.react";

const handleProps = props => ({ ...props, ref: props.didMount });

// NOTE: Alphabetical order

export const A = props => <Reify><a {...handleProps(props)}/></Reify>;

export const Article = props => <Reify><article {...handleProps(props)}/></Reify>;

export const Button = props => <Reify><button {...handleProps(props)}/></Reify>;

export const CheckboxInput = ({checked, ...props}) => <Reify>
    <input type="checkbox"
           checked={checked}
           onChange={() => checked.modify(c => !c)}
           {...handleProps(props)}/>
  </Reify>;

export const Div = props => <Reify><div {...handleProps(props)}/></Reify>;

export const I = props => <Reify><i {...handleProps(props)}/></Reify>;

export const LI = props => <Reify><li {...handleProps(props)}/></Reify>;

export const Main = props => <Reify><main {...handleProps(props)}/></Reify>;

export const Option = props => <Reify><option {...handleProps(props)}/></Reify>;

export const Select = ({value, ...props}) => <Reify>
    <select value={value}
            onChange={e => value.set(e.target.value)}
            {...handleProps(props)}/>
  </Reify>;

export const Small = props => <Reify><small {...handleProps(props)}/></Reify>;

export const Span = props => <Reify><span {...handleProps(props)}/></Reify>;

export const TBody = props => <Reify><tbody {...handleProps(props)}/></Reify>;

export const TD = props => <Reify><td {...handleProps(props)}/></Reify>;

export const TextArea = ({value, ...props}) => <Reify>
    <textarea type="text"
              value={value}
              onChange={e => value.set(e.target.value)}
              {...handleProps(props)}/>
  </Reify>;

export const TextInput = ({value, ...props}) => <Reify>
    <input type="text"
           value={value}
           onChange={e => value.set(e.target.value)}
           {...handleProps(props)}/>
  </Reify>;

export const UL = props => <Reify><ul {...handleProps(props)}/></Reify>;
