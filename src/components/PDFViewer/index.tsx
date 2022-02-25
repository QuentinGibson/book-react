import { FC } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import style from "./PDFViewer.module.css";
import path from "path";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
export const PDFViewer: FC<any> = ({}) => {
  const bookFilePath = path.resolve(__dirname, "assests/book.pdf");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <main className={style.main}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
        <Viewer
          fileUrl={bookFilePath}
          plugins={[defaultLayoutPluginInstance]}
        ></Viewer>
      </Worker>
    </main>
  );
};
