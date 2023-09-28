"use client";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";


const RTKWrapProvider = ({ children }) => {
 
  return (
    <div>
      <Provider store={store}>
       
        {children}
      </Provider>
    </div>
  );
};

export default RTKWrapProvider;
