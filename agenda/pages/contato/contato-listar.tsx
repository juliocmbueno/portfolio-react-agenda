import * as React from "react";
import {useEffect} from "react";
import LoginRequiredControl from "agenda/app/core/login/login-required-control";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {SidebarLayoutMenus} from "agenda/app/core/layout/sidebar/sidebar-layout";

const ContatoListar = () =>{

  const sidebarLayoutMenu = useSidebarLayoutMenu();

  useEffect(() => sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.CONTATOS), []);

  return (
    <LoginRequiredControl>
        // TODO ContatoListar
    </LoginRequiredControl>
  )
};

export default ContatoListar;
