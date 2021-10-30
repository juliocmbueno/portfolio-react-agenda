import * as React from "react";
import {ChangeEvent} from "react";

export const CampoText = (props:CampoTextProps) => {

  const onChange = (event:ChangeEvent<any>) => {
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">{props.label}</label>
      <input
        type="text"
        className="form-control"
        name={props.name}
        id={props.id || props.name}
        value={props.value}
        onChange={(event) => onChange(event)}/>
    </div>
  );
};

export interface CampoTextProps {
  label:string
  name:string;
  value?:string;
  rows?:number
  id?:string;
  required?:boolean;
  onChange?: (value:string) => void;
}
