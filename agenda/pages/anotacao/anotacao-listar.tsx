import {NextPage} from "next";
import * as React from "react";
import {useEffect, useState} from "react";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {SidebarLayoutMenus} from "agenda/app/core/layout/sidebar/sidebar-layout";
import LoginRequiredControl from "agenda/app/core/login/login-required-control";
import {useAnotacaoService} from "agenda/app/anotacao/use-anotacao-service";
import {Anotacao} from "agenda/app/anotacao/anotacao";
import {Dialog} from "primereact/dialog";
import {CampoText} from "agenda/app/core/campos/text/campo-text";
import {CampoTextarea} from "agenda/app/core/campos/textarea/campo-textarea";

import styles from "./anotacao-listar.module.scss";
import {IndexedDBFiltro} from "agenda/app/core/util/useIndexedDB";
import {useFormik} from "formik";
import {Validators} from "agenda/app/core/util/Validators";
import appConfirmDialog from "agenda/app/core/components/confirm-dialog";

export const AnotacaoListar:NextPage<any> = () => {

  const novaAnotacao = ():Anotacao => {
    return {
      titulo: '',
      descricao: '',
      cor: ''
    }
  };

  const sidebarLayoutMenu = useSidebarLayoutMenu();
  const anotacaoService = useAnotacaoService();
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [exibirDialogAnotacao, setExibirDialogAnotacao] = useState(false);
  const [classHeaderDialog, setClassHeaderDialog] = useState<string>();
  const [filtro, setFiltro] = useState<string>('');

  const formik = useFormik<any>({
    initialValues: novaAnotacao(),
    validate: (data) => {
      const erros:any = {};

      erros.titulo = Validators.required(data.titulo, 'Título');
      erros.descricao = Validators.required(data.descricao, 'Descrição');

      Validators.removeErrorsNull(erros);

      return erros;
    },
    onSubmit: () => salvar()
  });

  useEffect(() => {
    sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.ANOTACOES);
    listar(filtro);
  }, []);

  const criarNovo = () => {
    formik.resetForm();
    setClassHeaderDialog('');
    setExibirDialogAnotacao(true);
  };

  const salvar = () => {
    anotacaoService.salvar(formik.values).then(() => {
      setExibirDialogAnotacao(false);
      listar(filtro);
    });
  };

  const editar = (anotacaoTemp:Anotacao) => {
    formik.resetForm();
    formik.setValues(anotacaoTemp);
    setClassHeaderDialog(anotacaoTemp.cor ? `header-${anotacaoTemp.cor}` : '');
    setExibirDialogAnotacao(true);
  };

  const excluir = (event:React.MouseEvent, anotacao:Anotacao) => {
    event.preventDefault();

    appConfirmDialog({
      titulo: 'Confirmação',
      mensagem: 'Deseja realmente excluir a anotação?',
      accept: () => {
        anotacaoService
          .deletar({query: anotacao.id,})
          .then(() => listar(filtro));
      }
    });
  };

  const listar = (value:string) => {
    setFiltro(value);
    anotacaoService.listar(getFiltros(value)).then(anotacoes => setAnotacoes(anotacoes));
  };

  const getFiltros = (valor:string):IndexedDBFiltro[] => {
    return [
      {
        atributo: 'titulo',
        valor: valor,
        matchMode: "contains",
        ignoreCase: true
      },
      {
        atributo: 'descricao',
        valor: valor,
        matchMode: "contains",
        ignoreCase: true
      }
    ];
  };

  const onDoubleClickBtnExcluir = (event:React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const setCorAnotacao = (cor:string) => {
    const anotacao:Anotacao = formik.values;

    anotacao.cor = anotacao.cor == cor ? '' : cor;

    if(anotacao.cor){
      setClassHeaderDialog(`header-${anotacao.cor}`);

    } else {
      setClassHeaderDialog('');

    }
  };

  const getCards = () => {
    return anotacoes.map(anotacao => {
      return (
        <div key={anotacao.id} className="col-12 col-md-4 col-lg-3">
          <div className={'card mb-3 '+styles.cardAnotacao+' '+styles[anotacao.cor]} onDoubleClick={() => editar(anotacao)}>
            <div className={'card-header text-truncate '+styles.cardHeader}>
              {anotacao.titulo}
              <div
                className={styles.buttonDeletarAnotacao}
                onClick={(event) => excluir(event, anotacao)}
                onDoubleClick={(event) => onDoubleClickBtnExcluir(event)}>
                <i className="pi pi-times"/>
              </div>
            </div>
            <div className={'card-body '+styles.cardBody}>
              <p className="card-text">{anotacao.descricao}</p>
            </div>
          </div>
        </div>
      )
    });
  };

  return (
    <LoginRequiredControl>
      <div className="row pt-2">
        <div className="col-12 col-md-6 col-lg-3">
          <CampoText
            name="filtro-anotacoes"
            placeHolder="Filtrar anotações..."
            preInputGroup={<i className="pi pi-search"/> }
            value={filtro}
            onChange={(event) => setFiltro(event.target.value)}
            onInput={(value) => listar(value)}/>
        </div>
      </div>

      <div className="row">
        {getCards()}
      </div>

      <div className={styles.buttonNotaAnotacao} onClick={() => criarNovo()}>
        <i className="pi pi-plus"/>
      </div>

      <Dialog
        header="Adicionar Anotação"
        visible={exibirDialogAnotacao}
        className={classHeaderDialog}
        breakpoints={{'960px': '75vw', '640px': '100vw'}}
        style={{width: '40vw'}}
        footer={() => {
          return (
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={() => setExibirDialogAnotacao(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => formik.submitForm()}>Salvar</button>
            </div>
          )
        }}
        onHide={() => setExibirDialogAnotacao(false)}>

        <form onSubmit={formik.handleSubmit} className={formik.submitCount ? 'was-validated' : ''} noValidate>
          <div className="form">
            <div className="col-12">
              <CampoText
                label="Título"
                name="titulo"
                required={true}
                formik={formik}/>
            </div>
            <div className="col-12">
              <CampoTextarea
                label="Descrição"
                name="descricao"
                required={true}
                formik={formik}/>
            </div>
            <div className="col-12">
              <label className="form-label">Cor</label>
              <div className={styles.containerBtnColorAnotation}>
                <i className={'pi pi-circle-on ' + styles.green} onClick={() => setCorAnotacao('green')}/>
                <i className={'pi pi-circle-on ' + styles.yellow} onClick={() => setCorAnotacao('yellow')}/>
                <i className={'pi pi-circle-on ' + styles.orange} onClick={() => setCorAnotacao('orange')}/>
                <i className={'pi pi-circle-on ' + styles.pink} onClick={() => setCorAnotacao('pink')}/>
                <i className={'pi pi-circle-on ' + styles.purple} onClick={() => setCorAnotacao('purple')}/>
              </div>
            </div>
          </div>
        </form>

      </Dialog>
    </LoginRequiredControl>
  )
};

export default AnotacaoListar;
