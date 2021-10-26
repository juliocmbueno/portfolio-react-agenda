import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../styles/globals.scss';

import {AppProps} from 'next/app';
import * as React from "react";
import MainLayout from "agenda/app/core/layout/main/main-layout";
import useUsuarioLogado from "agenda/app/core/util/use-usuario-logado";

function MyApp({ Component, pageProps }: AppProps) {

  const {isLogado} = useUsuarioLogado();

  if(isLogado){
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );

  } else {
    return (
      <Component {...pageProps} />
    );

  }
}

export default MyApp;
