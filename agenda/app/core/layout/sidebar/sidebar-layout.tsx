import {NextPage} from "next";
import * as React from "react";
import {useEffect, useState} from "react";
import {Menu} from "primereact/menu";
import {useRouter} from "next/router";
import useSidebarLayoutMenu from "agenda/app/core/util/use-sitebar-layout-menu";
import {Subscription} from "rxjs";
import {MenuItem} from "primereact/menuitem";

import styles from "./sidebar-layout.module.scss";

export const SidebarLayoutMenus:any = {
  DIVIDER: {
    separator: true
  },
  INICIO: {
    id: 'INICIO',
    label: 'Início',
    icon: 'pi pi-home',
    router: '/'
  },
  CONTATOS: {
    id: 'CONTATOS',
    label: 'Contatos',
    icon: 'pi pi-users',
    router: '/contato/contato-listar'
  },
  COMPROMISSOS: {
    id: 'COMPROMISSOS',
    label: 'Compromissos',
    icon: 'pi pi-calendar',
    router: '/compromisso/compromisso-listar'
  },
  ANOTACOES: {
    id: 'ANOTACOES',
    label: 'Anotações',
    icon: 'pi pi-file',
    router: '/anotacao/anotacao-listar'
  }
};

const SidebarLayout:NextPage<any> = () => {

  const sidebarLayoutMenu = useSidebarLayoutMenu();
  const router = useRouter();
  const [filtroMenu, setFiltroMenu] = useState('');
  const [menuAtivo, setMenuAtivo] = useState<MenuItem|undefined>(undefined);

  const menus = Object.keys(SidebarLayoutMenus).map(key => {
    const menu = SidebarLayoutMenus[key];

    if(menu.router){
      menu.command = () => router.push(menu.router).then();
    }

    return menu;
  });

  const [menusFiltrados, setMenusFiltrados] = useState<MenuItem[]>([menus]);

  useEffect(() => {
    const subscription:Subscription = sidebarLayoutMenu.subscribeMenuAtivoChange((menuAtivo) => {
      setMenuAtivo(menuAtivo);

      const campoFiltroMenu:any = document.getElementById('filtro-menu');
      const menus = filtrarMenus(campoFiltroMenu ? campoFiltroMenu.value : null);
      atualizarClassNameMenuAtivo(menus, menuAtivo);

      setMenusFiltrados([...menus]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const onFiltroMenuChange = (valor:string) => {
    setFiltroMenu(valor);

    const menus = filtrarMenus(valor);
    atualizarClassNameMenuAtivo(menus, menuAtivo);

    setMenusFiltrados([...menus]);
  };

  const atualizarClassNameMenuAtivo = (menus:MenuItem[], menuAtivo:MenuItem|undefined) => {
    menus.forEach(menu => menu.className = menuAtivo && menuAtivo.id === menu.id ? 'active' : '');
  };

  const filtrarMenus = (valor:string) => {
    return valor && valor.length ?
      menus.filter(menu => menu.label == null || menu.label.toLowerCase().indexOf(valor.toLowerCase()) >= 0) :
      menus;
  };

  return (
    <div>
      <div className={styles.filtroMenuContainer}>
        <div className='input-group'>
          <span className="input-group-text"><i className="pi pi-search"/> </span>
          <input type="text" className="form-control" id="filtro-menu" value={filtroMenu} onChange={(event) => onFiltroMenuChange(event.target.value)} placeholder="Filrar menus..."/>
        </div>
      </div>
      <div>
        <Menu className="sidebar-menu" model={menusFiltrados} />
      </div>
    </div>
  );
};

export default SidebarLayout;
