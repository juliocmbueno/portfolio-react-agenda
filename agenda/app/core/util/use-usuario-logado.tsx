import {useEffect, useState} from "react";

const useUsuarioLogado = () =>{

  const [isLogado, setIsLogado] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLogado(localStorage.getItem('usuario-logado') != null);
  });

  return {
    isLogado,
    setIsLogado
  };
};

export default useUsuarioLogado;
