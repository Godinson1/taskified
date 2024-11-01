"use client";

import React from "react";
import styles from "./overview.module.css";
import Title from "../components/Title";

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex justify-between items-center gap-10'>
        <div className={styles.base_container}>
          <div className={styles.base1_container}>
            <Title />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
