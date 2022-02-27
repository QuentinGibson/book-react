import { DesktopHeader } from "./DesktopHeader";
import style from "./DesktopWindow.module.css";
import { PDFViewer } from "components/PDFViewer";

const DesktopWindow = () => {
  return (
    <>
      <DesktopHeader />
      <div className={style.container}>
        <PDFViewer />
        <footer className={style.footer}>Ads here in the future</footer>
      </div>
    </>
  );
};

export default DesktopWindow;
