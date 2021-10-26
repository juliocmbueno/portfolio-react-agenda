import {NextPage} from "next";
import React from "react";

import styles from "./main-layout.module.scss";
import TopbarLayout from "agenda/app/core/layout/topbar/topbar-layout";
import SidebarLayout from "agenda/app/core/layout/sidebar/sidebar-layout";

const MainLayout:NextPage<any> = (props) => {

  return (
    <div id="layout-wrapper">
      <div className={styles.layoutTopBar}>
        <TopbarLayout/>
      </div>
      <div className={styles.layoutSideBar}>
        <SidebarLayout/>
      </div>
      <div className={styles.layoutContent}>
        <div className="container">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
