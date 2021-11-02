import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Validators} from "agenda/app/core/util/Validators";
import {useCampoUtil} from "agenda/app/core/util/use-campo-util";
import {CamposProps} from "agenda/app/core/campos/campos-props";

export const CampoText = (props:CampoTextProps) => {

  const [onInputTriggerTimeOut, setOnInputTriggerTimeOut] = useState<any>();
  const campoUtil = useCampoUtil();

  const onChange = (event:ChangeEvent<any>) => {
    props.onChange && props.onChange(event);
    props.formik && props.formik.handleChange(event);
  };

  const onKeyDown = () => {
    if(onInputTriggerTimeOut){
      clearTimeout(onInputTriggerTimeOut);
    }
  };

  const onKeyUp = () => {
    if(onInputTriggerTimeOut){
      clearTimeout(onInputTriggerTimeOut);
    }

    setOnInputTriggerTimeOut(setTimeout(() => {
      props.onInput && props.onInput(props.value || '');
    }, 700));
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
      {props.label && campoUtil.getLabel(props)}
      {props.preInputGroup && <span className="input-group-text"><label htmlFor={props.id || props.name}>{props.preInputGroup}</label></span>}
      <input
        type="text"
        autoComplete="off"
        className={campoUtil.getClassName(props)}
        name={props.name}
        placeholder={props?.placeHolder}
        id={props.id || props.name}
        value={campoUtil.getValue(props)}
        onKeyDown={() => onKeyDown()}
        onKeyUp={() => onKeyUp()}
        onChange={(event) => onChange(event)}/>
      <div className="invalid-feedback">{Validators.getFormErrorMessage(props.formik, props.name)}</div>
    </div>
  );
};

export interface CampoTextProps extends CamposProps{
  removeMarginBottom?:boolean
  placeHolder?:string;
  onInput?: (value:string) => void;
  preInputGroup?:any;
}
