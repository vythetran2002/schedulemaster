import React from "react";
import Header from "./Header/Header";

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
