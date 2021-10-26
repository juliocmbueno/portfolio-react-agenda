import {NextPage} from "next";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useUsuarioLogado from "agenda/app/core/util/use-usuario-logado";

const LoginRequiredControl:NextPage<any> = (props) => {

  const usuarioLogado = useUsuarioLogado();
  const router = useRouter();

  useEffect(() => {
    if(usuarioLogado.isLogado == false){
      localStorage.setItem('url-acessada', router.asPath);
      router.push('/acesso/login').then();
    }
  }, [usuarioLogado.isLogado]);

  return (
    <>{usuarioLogado.isLogado && props.children}</>
  )
};

export default LoginRequiredControl;
