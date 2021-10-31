import useIndexedDB, {IndexedDBFiltro} from "agenda/app/core/util/useIndexedDB";
import {useEffect} from "react";
import {Anotacao} from "agenda/app/anotacao/anotacao";

export const useAnotacaoService = () => {

  const table = 'anotacaoDB';
  const indexedDB = useIndexedDB();

  const salvar = (anotacao:Anotacao):Promise<Anotacao> => {
    return indexedDB.salvar({
      table: table,
      entidade: anotacao,
    });
  };

  const deletar = (deleteEvent:{query: IDBValidKey | IDBKeyRange | undefined}):Promise<void> => {
    return indexedDB.deletar({
      table: table,
      query: deleteEvent.query,
    });
  };

  const listar = (filtros?:IndexedDBFiltro[]):Promise<Anotacao[]> => {
    return indexedDB.listar({table, filtros});
  };

  useEffect(() => {
    indexedDB.createTable(table, { autoIncrement: true, keyPath: 'id' }).then();
  }, []);

  return {
    salvar,
    listar,
    deletar
  };
};
