import {ChangeEvent} from "react";

export interface CamposProps {
  label?:string
  name:string;
  value?:string;
  id?:string;
  required?:boolean;
  formik?:any;
  onChange?: (event:ChangeEvent<any>) => void;
}
