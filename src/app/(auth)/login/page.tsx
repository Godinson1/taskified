"use client";

import React from "react";
import styles from "../styles/auth.module.css";
import Login from "../components/Login";

const page = () => {
  return (
    <div className={styles.auth_main}>
      <div className={styles.auth_main_container}>
        <Login />
      </div>
    </div>
  );
};

export default page;
