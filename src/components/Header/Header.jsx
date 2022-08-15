import React from "react";
import { Button } from "@mui/material"; 

import './Header.scss';

export function Header () {

  const openAttention = () => {
    BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/attention/?reqNumber=&dealId=0&source=`, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  return (<div className='header'>
            <img className='header__logo' src="https://crm.centralnoe.ru/dealincom/assets/logo_can.jpg" alt="logo"/>
            <Button
              size="small"
              variant='outlined'
              color='error'
              onClick={openAttention}
            >
              сообщить о проблеме
            </Button>
          </div>)
}
