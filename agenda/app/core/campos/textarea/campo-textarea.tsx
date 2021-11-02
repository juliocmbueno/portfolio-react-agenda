import * as React from "react";
import {ChangeEvent} from "react";
import {Validators} from "agenda/app/core/util/Validators";
import {useCampoUtil} from "agenda/app/core/util/use-campo-util";
import {CamposProps} from "agenda/app/core/campos/campos-props";

export const CampoTextarea = (props:CampoTextareaProps) => {

  const campoUtil = useCampoUtil();

  const onChange = (event:ChangeEvent<any>) => {
    props.onChange && props.onChange(event);
    props.formik && props.formik.handleChange(event);
  };

  return (
    <div className="mb-3">
      {campoUtil.getLabel(props)}
      <textarea
        className={campoUtil.getClassName(props)}
        rows={props.rows || 3}
        id={props.id || props.name}
        name={props.name}
        value={campoUtil.getValue(props)}
        onChange={(event) => onChange(event)}/>
      <div className="invalid-feedback">{Validators.getFormErrorMessage(props.formik, props.name)}</div>
    </div>
  );
};

export interface CampoTextareaProps extends CamposProps{
  rows?:number
}
