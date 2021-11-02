
export class Validators{

  static required(value:string, label?:string):string|null{
    return !value || value.trim().length == 0 ? `${label ? label+' é obrigatório' : 'O campo é obrigatório'}` : null;
  }

  static removeErrorsNull(erros:any):void{
    Object.keys(erros).forEach(key => {
      if(!erros[key]){
        delete erros[key];
      }
    });
  }

  static isFormFieldValid(formik:any, name:string):boolean{
    return formik && !!(formik.touched[name] && formik.errors[name])
  }

  static getFormErrorMessage(formik:any, name:string):string{
    return formik && this.isFormFieldValid(formik, name) && formik.errors[name];
  }
}
