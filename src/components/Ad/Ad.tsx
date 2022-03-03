import { useOwAds } from "hooks/useOwAds";
import style from "./Ads.module.css";

export default function Ad() {
  const setAdContainer = useOwAds();
  return (
    <>
      <div className={style.adContainer} ref={setAdContainer}></div>
    </>
  );
}
