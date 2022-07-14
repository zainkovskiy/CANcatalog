import React from 'react';
import { motion } from 'framer-motion';


export function MapSideBarItem({ item }){

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
  return(
    <motion.div
      variants={ variants }
      initial='hidden'
      animate='visible'
    >
      { item.reqNumber }
    </motion.div>
  )
}