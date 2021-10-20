import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

const LoginRequiredControl:NextPage<any> = (props) => {

  const router = useRouter();
  const [isUsuarioLogado, setIsUsuarioLogado] = useState(() => false);

  useEffect(() => {
    const naoPossuiUsuarioLogado = localStorage.getItem('usuario-logado') == null;

    if(naoPossuiUsuarioLogado){
      router.push('/acesso/login').then();

    } else if(!isUsuarioLogado){
      setIsUsuarioLogado(true);

    }
  }, [isUsuarioLogado]);

  return (
    <>{isUsuarioLogado && props.children}</>
  )
};

export default LoginRequiredControl;
