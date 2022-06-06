import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import './SearchField.scss';

import { SearchItem } from "components/SearchItem";

export function SearchField(props) {
  const { searchList, handlerSelect, closeBuilderList } = props;
  return (
    <motion.div
      className="search"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-search='yes'
    >
      {
        searchList.map((item, idx) =>
          <SearchItem
            key={idx}
            item={item}
            handlerSelect={handlerSelect}
            closeBuilderList={closeBuilderList}
          />)
      }
    </motion.div>
  )
}