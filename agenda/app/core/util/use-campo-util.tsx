import {Validators} from "agenda/app/core/util/Validators";
import * as React from "react";
import {CamposProps} from "agenda/app/core/campos/campos-props";

export const useCampoUtil = () => {

  const getValue = (props:CamposProps):string => {
    return props?.formik?.values[props.name] || props.value;
  };

  const getClassName = (props:CamposProps):string => {
    const styleClasses:string[] = ['form-control'];

    if(Validators.isFormFieldValid(props.formik, props.name)){
      styleClasses.push('is-invalid');
    }

    return styleClasses.join(' ');
  };

  const getLabel = (props:CamposProps) => {
    return (
      <label htmlFor={props.id || props.name} className="form-label">{props.label}{props.required && <span>*</span>}</label>
    )
  };

  return {
    getValue,
    getClassName,
    getLabel
  }
};
