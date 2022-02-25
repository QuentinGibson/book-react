import { FC } from "react";
import styles from "./NavigationButton.module.css";

export const NavigationButton: FC<Children> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
