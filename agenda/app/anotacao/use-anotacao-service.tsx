import useIndexedDB from "agenda/app/core/util/useIndexedDB";
import {useEffect} from "react";
import {Anotacao} from "agenda/app/anotacao/anotacao";

export const useAnotacaoService = () => {

  const table = 'anotacaoDB';
  const indexedDB = useIndexedDB();

  const salvar = (saveEvent:{anotacao:Anotacao, callback:(anotacao:Anotacao) => void}) => {
    indexedDB.getRequest().onsuccess = (event) => {
      const objectStore = indexedDB.getObjectStoreFromTransaction(event, table, 'readwrite');
      objectStore.add(saveEvent.anotacao);
      saveEvent?.callback(saveEvent.anotacao);
    };
  };

  const listar = (callback: (anotacoes:Anotacao[]) => void) => {
    indexedDB.getRequest().onsuccess = (event) => {
      indexedDB.getObjectStoreFromTransaction(event, table).getAll().onsuccess = (event:Event) => {
        const target:any = event?.target;
        callback(target?.result);
      }
    };
  };

  useEffect(() => {
    indexedDB.createTable(table, { autoIncrement: true, keyPath: 'id' });
  }, []);

  return {
    salvar,
    listar
  };
};
