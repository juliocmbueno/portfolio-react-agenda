import * as React from "react";
import {ChangeEvent} from "react";

export const CampoTextarea = (props:CampoTextareaProps) => {

  const onChange = (event:ChangeEvent<any>) => {
    props.onChange && props.onChange(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">{props.label}</label>
      <textarea
        className="form-control"
        rows={props.rows || 3}
        id={props.id || props.name}
        name={props.name}
        value={props.value}
        onChange={(event) => onChange(event)}/>
    </div>
  );
};

export interface CampoTextareaProps {
  label:string
  name:string;
  value?:string;
  rows?:number
  id?:string;
  required?:boolean;
  onChange?: (value:string) => void;
}
