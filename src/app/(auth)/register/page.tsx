"use client";

import React from "react";
import styles from "../styles/auth.module.css";
import SignUp from "../components/Signup";

const page = () => {
  return (
    <div className={styles.auth_main}>
      <div className={styles.auth_main_container}>
        <SignUp />
      </div>
    </div>
  );
};

export default page;
