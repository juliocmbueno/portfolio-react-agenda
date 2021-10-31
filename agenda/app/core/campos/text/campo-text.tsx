import * as React from "react";
import {ChangeEvent} from "react";

export const CampoText = (props:CampoTextProps) => {

  const onChange = (event:ChangeEvent<any>) => {
    props.onChange && props.onChange(event.target.value);
  };

  const getContainerClasses = ():string => {
    const styleClasses:string[] = [];

    if(!props.removeMarginBottom){
      styleClasses.push('mb-3');
    }

    if(props.preInputGroup){
      styleClasses.push('input-group');
    }

    return styleClasses.join(' ');
  };

  return (
    <div className={getContainerClasses()}>
      {props.label && <label htmlFor={props.id || props.name} className="form-label">{props.label}</label>}
      {props.preInputGroup && <span className="input-group-text">{props.preInputGroup}</span>}
      <input
        type="text"
        className="form-control"
        name={props.name}
        placeholder={props?.placeHolder}
        id={props.id || props.name}
        value={props.value}
        onChange={(event) => onChange(event)}/>
    </div>
  );
};

export interface CampoTextProps {
  label?:string
  name:string;
  value?:string;
  rows?:number
  id?:string;
  removeMarginBottom?:boolean
  required?:boolean;
  placeHolder?:string;
  onChange?: (value:string) => void;
  preInputGroup?:any;
}
