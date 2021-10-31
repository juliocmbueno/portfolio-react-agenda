import {Entidade} from "agenda/app/core/util/Entidade";

export const useIndexedDB = () => {

  const MODE_READ_WRITE:IDBTransactionMode = 'readwrite';
  const MODE_READONLY:IDBTransactionMode = 'readonly';
  const MODE_VERSION_CHANGE:IDBTransactionMode = 'versionchange';

  const getRequest = (config?:UseIndexedDBGetRequestConfig):IDBOpenDBRequest => {
    const name = config?.name || 'portfolio-react-agenda';
    const version = config?.version || 1;
    return window.indexedDB.open(name, version);
  };

  const getDBFromEvent = (event:any):IDBDatabase => {
    return event?.target?.result;
  };

  const createTable = (nane:string, options?: IDBObjectStoreParameters) => {
    getRequest().onupgradeneeded = (event) => {
      getDBFromEvent(event)?.createObjectStore(nane, options);
    }
  };

  const salvar = (saveEvent:{table:string, entidade:Entidade}):Promise<any> => {
    return new Promise<Entidade>((resolve) => {
      getRequest().onsuccess = (event) => {
        const objectStore = getDBFromEvent(event)
          .transaction([saveEvent.table], MODE_READ_WRITE)
          .objectStore(saveEvent.table);

        if(saveEvent.entidade.id){
          objectStore.put(saveEvent.entidade);

        } else {
          objectStore.add(saveEvent.entidade);

        }

        resolve(saveEvent.entidade);
      };
    });
  };

  const deletar = (deleteEvent:{table:string, query: IDBValidKey | IDBKeyRange | undefined}):Promise<void> => {
    return new Promise<void>(resolve => {
      getRequest().onsuccess = (event) => {
        if(deleteEvent.query){
          getDBFromEvent(event)
            .transaction([deleteEvent.table], MODE_READ_WRITE)
            .objectStore(deleteEvent.table)
            .delete(deleteEvent.query);

          resolve();
        }
      };
    });
  };

  const listar = (listarEvent:{table:string}):Promise<any[]> => {
    return new Promise<any[]>(resolve => {
      getRequest().onsuccess = (event) => {
        const entidades:Entidade[] = [];

        getDBFromEvent(event)
          .transaction([listarEvent.table], MODE_READONLY)
          .objectStore(listarEvent.table)
          .openCursor().onsuccess = (event) => {
          const target:any = event?.target;
          const cursor = target?.result;

          if (cursor) {
            entidades.push(cursor.value);
            cursor.continue();

          } else {
            resolve(entidades);

          }
        };
      };
    });
  };

  return {
    createTable,
    salvar,
    deletar,
    listar
  };
};

export default useIndexedDB;

export interface UseIndexedDBGetRequestConfig{
  name?:string;
  version?:number;
}
