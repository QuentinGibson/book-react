import style from "./DesktopWindow.module.css";
import { DesktopHeader } from "./DesktopHeader";
import React, { useEffect, useRef } from "react";

export default function Layout({ children }) {
  return (
    <>
      <DesktopHeader />
      <div className={style.container}>
        {children}
        <footer className={style.footer}>Ads here in the future</footer>
      </div>
    </>
  );
}
