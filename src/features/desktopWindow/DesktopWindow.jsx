import { DesktopHeader } from "./DesktopHeader";
import style from "./DesktopWindow.module.css";
import { PDFViewer } from "components/PDFViewer";
import Layout from "components/Layout";

const DesktopWindow = () => {
  return (
    <Layout>
      <PDFViewer />
    </Layout>
  );
};

export default DesktopWindow;
