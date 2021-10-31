import {Entidade} from "agenda/app/core/util/Entidade";

export interface Anotacao extends Entidade{

  titulo:string;
  descricao:string;
  cor:string;

}
