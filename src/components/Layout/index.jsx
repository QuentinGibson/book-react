import style from "./DesktopWindow.module.css";
import { DesktopHeader } from "./DesktopHeader";
import React, { useEffect, useRef } from "react";

export default function Layout({ children }) {
  return (
    <div className={style.container}>
      <DesktopHeader />
      {children}
      <footer className={style.footer}>Ads here in the future</footer>
    </div>
  );
}
