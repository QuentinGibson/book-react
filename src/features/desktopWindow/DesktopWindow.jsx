import { DesktopHeader } from "./DesktopHeader";
import style from "./DesktopWindow.module.css";
import { useTranslation } from "react-i18next";
import { BiFile, BiBookOpen } from "react-icons/bi";
import { PDFViewer } from "components/PDFViewer";
import { NavigationButton } from "components/NavigationButton";

//avoid the use of static text, use i18n instead, each language has its own text, and the text is stored in the
//locales folder in the project root
const DesktopWindow = () => {
  const { t } = useTranslation();
  return (
    <>
      <DesktopHeader />
      <div className={style.container}>
        <nav className={style.navigation}>
          <NavigationButton>
            <BiFile className={style.icon} />
          </NavigationButton>
          <NavigationButton>
            <BiBookOpen className={style.icon} />
          </NavigationButton>
        </nav>
        <PDFViewer />
        <footer className={style.footer}>Ads here in the future</footer>
      </div>
    </>
  );
};

export default DesktopWindow;
