import useIndexedDB from "agenda/app/core/util/useIndexedDB";
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

  const listar = ():Promise<Anotacao[]> => {
    return indexedDB.listar({table});
  };

  useEffect(() => {
    indexedDB.createTable(table, { autoIncrement: true, keyPath: 'id' });
  }, []);

  return {
    salvar,
    listar,
    deletar
  };
};
