import {NextPage} from "next";
import * as React from "react";
import {useEffect} from "react";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {SidebarLayoutMenus} from "agenda/app/core/layout/sidebar/sidebar-layout";
import LoginRequiredControl from "agenda/app/core/login/login-required-control";

export const CompromissoListar:NextPage<any> = () => {

  const sidebarLayoutMenu = useSidebarLayoutMenu();

  useEffect(() => {
    sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.COMPROMISSOS);
  }, []);

  return (
    <LoginRequiredControl>
      <div>// TODO CompromissoListar</div>
    </LoginRequiredControl>
  );
};

export default CompromissoListar;
