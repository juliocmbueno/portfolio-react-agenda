import {confirmDialog} from "primereact/confirmdialog";

const appConfirmDialog = (props:appConfirmDialogProps) => {
  return (
    confirmDialog({
      message: props.mensagem,
      header: props.titulo,
      icon: 'pi pi-question-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => props.accept(),
      reject: () => props.reject && props.reject()
    })
  )
};

export default appConfirmDialog;

export interface appConfirmDialogProps {
  mensagem:string;
  titulo:string;
  accept: () => void;
  reject?: () => void;
}
