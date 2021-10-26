import {NextPage} from "next";
import * as React from "react";
import {useRouter} from "next/router";

import styles from "./topbar-layout.module.scss";

const TopbarLayout:NextPage<any> = () => {

  const router = useRouter();

  const sair = () => {
    localStorage.removeItem('usuario-logado');
    router.push('/acesso/login').then();
  };

  const acessarIndex = () => {
    router.push('/').then();
  };

  return (
    <>
      <div className={styles.logo} onClick={() => acessarIndex()}>
        <i className="fas fa-clipboard-list"/>
        <span>Agenda</span>
      </div>
      <ul className={styles.rightMenu}>
        <li>
          <a onClick={() => sair()}>Sair</a>
        </li>
      </ul>
    </>
  );
};

export default TopbarLayout;
