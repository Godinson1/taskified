import React from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "@/contexts/ContextProvider";
import IconButton from "@mui/material/IconButton/IconButton";

import styles from "@/styles/dashboard.module.css";
import { useAuth } from "@/app/hooks/useAuth";
import Button from "@mui/material/Button";
import { useTitle } from "@/app/hooks/useTitle";

const DashboardNavbar = () => {
  const { logout } = useAuth();
  const { handleMetaMaskConnect } = useTitle();
  const { currentColor, activeMenu, setActiveMenu } = useStateContext();

  return (
    <div className={`${styles.dashboard_nav} ${activeMenu ? styles.dashboard_nav_active : styles.dashboard_nav_full}`}>
      <div className='flex'>
        <div className='flex justify-center items-center'>
          <IconButton onClick={() => setActiveMenu(!activeMenu)}>
            <AiOutlineMenu color={currentColor} />
          </IconButton>
        </div>
      </div>
      <div className='flex gap-3 justify-center items-center'>
        <Button disabled={false} onClick={() => handleMetaMaskConnect()} style={{ backgroundColor: "#7c66da", height: 50 }} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Connect Wallet
        </Button>
        <Button disabled={false} onClick={() => logout()} style={{ backgroundColor: "#7c66da", height: 50 }} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
