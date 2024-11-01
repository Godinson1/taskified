"use client";

import React, { ReactNode } from "react";
import { AuthGuard } from "@/app/hooks/useAuth";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { useStateContext } from "@/contexts/ContextProvider";
import DashboardNavbar from "@/app/(dashboard)/components/DashboardNavbar";

import styles from "@/styles/dashboard.module.css";
import { TitleContextProvider } from "@/contexts/TitleContextProvider";

const DashbaordLayout = ({ children }: { children: ReactNode }) => {
  const { activeMenu } = useStateContext();

  return (
    <AuthGuard>
      <TitleContextProvider>
        <div className={styles.dashboard_container}>
          {activeMenu && (
            <div className={`sidebar ${styles.dashboard_sidebar}`}>
              <Sidebar />
            </div>
          )}
          <div className={`${styles.dashboard_main} ${activeMenu ? styles.dashboard_main_active : styles.dashboard_main_full}`}>
            <DashboardNavbar />
            <div className={styles.dashboard_child}>{children}</div>
          </div>
        </div>
      </TitleContextProvider>
    </AuthGuard>
  );
};

export default DashbaordLayout;
