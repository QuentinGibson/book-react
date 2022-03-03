import { useState } from "react";
export default function useFile() {
  const [file, setFile] = useState("");

  function setFileFromPath(path: string) {
    setFile(path);
  }

  return [file, setFileFromPath];
}
