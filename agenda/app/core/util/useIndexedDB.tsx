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

  const createTable = (nane:string, options?: IDBObjectStoreParameters):Promise<IDBObjectStore> => {
    return new Promise<IDBObjectStore>(resolve => {
      getRequest().onupgradeneeded = (event) => {
        resolve(getDBFromEvent(event)?.createObjectStore(nane, options));
      }
    });
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

  const listar = (listarEvent:{table:string, filtros?:IndexedDBFiltro[]}):Promise<any[]> => {
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
            const entidade = cursor.value;
            if(satisfazFiltros(entidade, listarEvent.filtros)){
              entidades.push(entidade);
            }

            cursor.continue();

          } else {
            resolve(entidades);

          }
        };
      };
    });
  };

  const satisfazFiltros = (entidade: any, filtros: IndexedDBFiltro[]|undefined) => {
    let safisfazFiltro = true;
    if(filtros){
        let indexFiltro = 0;
        while((indexFiltro == 0 || !safisfazFiltro) && indexFiltro < filtros.length){
          const filtro = filtros[indexFiltro++];
          if(filtro.valor && filtro.valor.toString().trim().length > 0){
            const matchMode = filtro.matchMode || "equals";
            const entidadeValor = entidade[filtro.atributo];

            safisfazFiltro = entidadeValor != undefined && matchModeFactory[matchMode](entidadeValor, filtro.valor, filtro.ignoreCase);
          }
        }
    }

    return safisfazFiltro;
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

export type MatchMode = 'contains'|'start'|'end'|'equals';

const matchModeFactory = {
  contains: (valor_1:any, valor_2:any, ignoreCase?:boolean) => {
    return ignoreCase ?
      valor_1.toString().toLowerCase().indexOf(valor_2.toString().toLowerCase()) >= 0 :
      valor_1.toString().indexOf(valor_2.toLowerCase()) >= 0;
  },
  start: (valor_1:any, valor_2:any, ignoreCase?:boolean) => {
    return ignoreCase ?
      valor_1.toString().toLowerCase().startsWith(valor_2.toString().toLowerCase()) :
      valor_1.toString().startsWith(valor_2.toString());
  },
  end: (valor_1:any, valor_2:any, ignoreCase?:boolean) => {
    return ignoreCase ?
      valor_1.toString().toLowerCase().endsWith(valor_2.toString().toLowerCase()) :
      valor_1.toString().endsWith(valor_2.toString());
  },
  equals: (valor_1:any, valor_2:any, ignoreCase?:boolean) => {
    return ignoreCase ?
      valor_1.toString().toLowerCase().equals(valor_2.toLowerCase()) :
      valor_1 == valor_2;
  },
};

export interface IndexedDBFiltro{
  atributo:string;
  valor:any;
  matchMode?:MatchMode;
  ignoreCase?:boolean;
}
