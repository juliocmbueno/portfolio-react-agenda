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
  const [anotacao, setAnotacao] = useState<Anotacao|any>(novaAnotacao());
  const [exibirDialogAnotacao, setExibirDialogAnotacao] = useState(false);
  const [classHeaderDialog, setClassHeaderDialog] = useState<string>();

  useEffect(() => {
    sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.ANOTACOES);
    atualizarAnotacoes();
  }, []);

  const atualizarAnotacoes = () => {
    anotacaoService.listar().then(anotacoes => setAnotacoes(anotacoes));
  };

  const criarNovo = () => {
    setAnotacao(novaAnotacao());
    setClassHeaderDialog('');
    setExibirDialogAnotacao(true);
  };

  const salvar = () => {
    anotacaoService.salvar(anotacao).then(() => {
      setExibirDialogAnotacao(false);
      atualizarAnotacoes();
    });
  };

  const editar = (anotacaoTemp:Anotacao) => {
    setAnotacao({...anotacaoTemp});
    setClassHeaderDialog(anotacaoTemp.cor ? `header-${anotacaoTemp.cor}` : '');
    setExibirDialogAnotacao(true);
  };

  const excluir = (event:React.MouseEvent, anotacao:Anotacao) => {
    event.preventDefault();
    anotacaoService
      .deletar({query: anotacao.id,})
      .then(() => atualizarAnotacoes());
  };

  const onDoubleClickBtnExcluir = (event:React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const atualizarAtributo = (atributo:any, value:any) => {
    anotacao[atributo] = value;
    setAnotacao(() => ({...anotacao}));
  };

  const setCorAnotacao = (cor:string) => {
    anotacao.cor = anotacao.cor == cor ? '' : cor;

    if(anotacao.cor){
      setClassHeaderDialog(`header-${anotacao.cor}`);

    } else {
      setClassHeaderDialog('');

    }

    setAnotacao(() => ({...anotacao}));
  };

  const getCarts = () => {
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
          <CampoText name="filtro-anotacoes" placeHolder="Filtrar anotações..." preInputGroup={<i className="pi pi-search"/> }/>
        </div>
      </div>

      <div className="row">
        {getCarts()}
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
              <button className="btn btn-primary" onClick={() => salvar()}>Salvar</button>
            </div>
          )
        }}
        onHide={() => setExibirDialogAnotacao(false)}>
        <div className="form">
          <div className="col-12">
            <CampoText
              label="Título"
              name="titulo"
              value={anotacao.titulo}
              onChange={(value) => atualizarAtributo('titulo', value)}/>
          </div>
          <div className="col-12">
            <CampoTextarea
              label="Descrição"
              name="descricao"
              value={anotacao.descricao}
              onChange={(value) => atualizarAtributo('descricao', value)}/>
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
      </Dialog>
    </LoginRequiredControl>
  )
};

export default AnotacaoListar;
