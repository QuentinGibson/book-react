import { useState, useCallback, useEffect } from "react";
export const useOwAds = () => {
  const [owAdInstance, setOwAds] = useState<any | null>(null);

  const [currentContainer, setCurrentContainer] =
    useState<HTMLDivElement | null>(null);
  const [owInternalRendered, setInternalRendered] = useState(false);

  const setContainerOwAD = useCallback((containerEl: HTMLDivElement) => {
    if (containerEl !== null) setCurrentContainer(containerEl);
  }, []);

  const onWindowStateChanged = useCallback(
    (state) => {
      if (state && owAdInstance !== null) {
        if (state.window_state === "minimized") owAdInstance.removeAd();
        // when state changes to minimized, call removeAd()
        else if (
          state.window_previous_state === "minimized" &&
          state.window_state === "normal"
        )
          owAdInstance.refreshAd(null); // when state changes from minimized to normal, call refreshAd()
      }
    },
    [owAdInstance]
  );

  useEffect(() => {});

  useEffect(() => {
    if (owInternalRendered) owAdInstance?.refreshAd(null);
  }, [owAdInstance, owInternalRendered]);

  useEffect(() => {
    // [ "ow_internal_rendered", "player_loaded", "display_ad_loaded", "play",  "impression","complete", "error" ]
    ["ow_internal_rendered", "error"].forEach((currentEvent) => {
      owAdInstance?.removeEventListener(currentEvent, () => {});
    });
    owAdInstance?.addEventListener("ow_internal_rendered", () => {
      setInternalRendered(true); // It is now safe to call any API you want owAd.refreshAd()
      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
      overwolf.windows.onStateChanged.addListener(onWindowStateChanged);
    });
    owAdInstance?.addEventListener("error", (e: any) => {
      console.log("error", e);
    });
  }, [owAdInstance, onWindowStateChanged]);

  return [owAdInstance, setContainerOwAD];
};
