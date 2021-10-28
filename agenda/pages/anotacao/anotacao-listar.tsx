import {NextPage} from "next";
import * as React from "react";
import {useEffect, useState} from "react";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {SidebarLayoutMenus} from "agenda/app/core/layout/sidebar/sidebar-layout";
import LoginRequiredControl from "agenda/app/core/login/login-required-control";
import useIndexedDB from "agenda/app/core/util/useIndexedDB";

export const AnotacaoListar:NextPage<any> = () => {

  const sidebarLayoutMenu = useSidebarLayoutMenu();
  const indexedDB = useIndexedDB();
  const table = 'anotacaoDB';
  const [anotacoes, setAnotacoes] = useState<any>([]);

  useEffect(() => {
    sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.ANOTACOES);
    indexedDB.createTable(table, { autoIncrement: true, keyPath: 'id' });

    atualizarAnotacoes();
  }, []);

  const adicionarAnotacao = () => {
    indexedDB.getRequest().onsuccess = (event) => {
      const objectStore = indexedDB.getObjectStoreFromTransaction(event, table, 'readwrite');
      objectStore.add({
        titulo: 'Primeira anotação 5',
        descricao: 'Descrição da anotação 5',
        cor: 'vermelho'
      });

      atualizarAnotacoes();
    };
  };

  const atualizarAnotacoes = () => {
    indexedDB.getRequest().onsuccess = (event) => {
      indexedDB.getObjectStoreFromTransaction(event, table).getAll().onsuccess = (event:Event) => {
        const target:any = event?.target;
        setAnotacoes(target?.result);
      }
    };
  };

  return (
    <LoginRequiredControl>
      <div className="row">
        <div className="col-auto">
          <button className="btn btn-outline-primary" onClick={() => adicionarAnotacao()}>Adicionar Anotação</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 ws-pre-wrap">
          {JSON.stringify(anotacoes, null, '\t')}
        </div>
      </div>
    </LoginRequiredControl>
  )
};

export default AnotacaoListar;
