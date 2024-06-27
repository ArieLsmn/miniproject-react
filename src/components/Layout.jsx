import React, { useContext, useState } from "react";

import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";





function Layout({ children }) {


 
    return (
      <>
        
          <Header />
          <div className="mt-4">
          {children}
          </div>
      </>
    );
}


export default Layout;
