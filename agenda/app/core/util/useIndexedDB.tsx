
export const useIndexedDB = () => {

  const getRequest = (config?:UseIndexedDBGetRequestConfig):IDBOpenDBRequest => {
    const name = config?.name || 'portfolio-react-agenda';
    const version = config?.version || 1;
    return window.indexedDB.open(name, version);
  };

  const getDBFromEvent = (event:any):IDBDatabase => {
    return event?.target?.result;
  };

  const getTransaction = (event:any, table:string[], mode:IDBTransactionMode = "readonly"):IDBTransaction => {
    return getDBFromEvent(event).transaction(table, mode);
  };

  const getObjectStoreFromTransaction = (event:any, table:string, mode:IDBTransactionMode = "readonly"):IDBObjectStore => {
    return getDBFromEvent(event).transaction([table], mode).objectStore(table);
  };

  const createTable = (nane:string, options?: IDBObjectStoreParameters) => {
    getRequest().onupgradeneeded = (event) => {
      getDBFromEvent(event)?.createObjectStore(nane, options);
    }
  };

  return {
    getRequest,
    getDBFromEvent,
    getTransaction,
    getObjectStoreFromTransaction,
    createTable
  };
};

export default useIndexedDB;

export interface UseIndexedDBGetRequestConfig{
  name?:string;
  version?:number;
}
