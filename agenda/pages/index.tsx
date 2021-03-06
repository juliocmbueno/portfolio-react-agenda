import {NextPage} from 'next';
import * as React from 'react';
import {useEffect} from 'react';
import LoginRequiredControl from "agenda/app/core/login/login-required-control";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {SidebarLayoutMenus} from "agenda/app/core/layout/sidebar/sidebar-layout";

const Home: NextPage = () => {

  const sidebarLayoutMenu = useSidebarLayoutMenu();

  useEffect(() => sidebarLayoutMenu.setMenuAtivo(SidebarLayoutMenus.INICIO), []);

  return (
    <LoginRequiredControl>
        Index
    </LoginRequiredControl>
  )
};

export default Home;
