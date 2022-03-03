import style from "./DesktopWindow.module.css";
import { DesktopHeader } from "./DesktopHeader";
import React, { useEffect, useRef } from "react";
import Ad from "components/Ad/Ad";

export default function Layout({ children }) {
  return (
    <>
      <div className={style.container}>{children}</div>
    </>
  );
}
