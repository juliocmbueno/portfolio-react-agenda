import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.scss';

import {AppProps} from 'next/app';
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
