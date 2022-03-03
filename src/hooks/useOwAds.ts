import { RootReducer } from "app/rootReducer";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

declare type EventDispCallback = (data: any) => void;
declare class EventDispatcher {
  addEventListener(eventName: string, listener: EventDispCallback): boolean;
  removeEventListener(eventName: string, listener: EventDispCallback): boolean;
  fireEvent(eventName: string, eventData: any): null | undefined;
}

declare type OwAdOptionsSize = {
  width: number;
  height: number;
};

interface OwAdOptions {
  autoplay?: boolean;
  size?: OwAdOptionsSize | OwAdOptionsSize[];
}

declare class OwAd {
  constructor(container: HTMLElement, options: OwAdOptions);
  get uid(): string | null;
  get version(): string;
  get containerElem(): {
    id: string;
  };
  play(): boolean;
  pause(): boolean;
  refreshAd(refreshOptions: any): boolean;
  refreshCurrentWFstep(): void;
  removeAd(): boolean;
  addEventListener(eventName: string, listener: EventDispCallback): boolean;
  removeEventListener(eventName: string, listener: EventDispCallback): boolean;
}

export const useOwAds = () => {
  const [owAdInstance, setOwAds] = useState<OwAd | null>(null);
  const [currentContainer, setCurrentContainer] =
    useState<HTMLDivElement | null>(null);
  const [owInternalRendered, setInternalRendered] = useState(false);

  const setContainerOwAD = useCallback((containerEl: HTMLDivElement) => {
    if (containerEl !== null) {
      setCurrentContainer(containerEl);
    }
  }, []);

  const onWindowStateChanged = useCallback(
    (state) => {
      // console.log(`Window state changed: ${JSON.stringify(state)}`);

      if (state && owAdInstance !== null) {
        // when state changes to minimized, call removeAd()
        if (state.window_state === "minimized") {
          owAdInstance.removeAd();
        }
        // when state changes from minimized to normal, call refreshAd()
        else if (
          state.window_previous_state === "minimized" &&
          state.window_state === "normal"
        ) {
          owAdInstance.refreshAd(null);
        }
      }
    },
    [owAdInstance]
  );

  useEffect(() => {
    if (
      OwAd &&
      process.env.NODE_ENV === "production" &&
      currentContainer !== null
    ) {
      const owAds = new OwAd(currentContainer, {
        size: { width: 400, height: 300 },
      });
      setOwAds(owAds);
    }
  }, [currentContainer]);

  //continue

  useEffect(() => {
    // [
    //   "ow_internal_rendered",
    //   "player_loaded",
    //   "display_ad_loaded",
    //   "play",
    //   "impression",
    //   "complete",
    //   "error",
    // ]
    ["ow_internal_rendered", "error"].forEach((currentEvent) => {
      owAdInstance?.removeEventListener(currentEvent, () => {});
    });
    owAdInstance?.addEventListener("ow_internal_rendered", () => {
      // It is now safe to call any API you want ( e.g. _owAd.refreshAd() or
      // _owAd.removeAd() )
      // call the overwolf api
      setInternalRendered(true);

      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
      overwolf.windows.onStateChanged.addListener(onWindowStateChanged);
    });

    // owAdInstance?.addEventListener("player_loaded", (e: any) => {
    //   console.log("player_loaded", e);
    // });

    // owAdInstance?.addEventListener("display_ad_loaded", (e: any) => {
    //   console.log("display_ad_loaded", e);
    // });
    // owAdInstance?.addEventListener("play", (e: any) => {
    //   console.log("play", e);
    // });

    // owAdInstance?.addEventListener("impression    ", (e: any) => {
    //   console.log("impression    ", e);
    // });

    // owAdInstance?.addEventListener("complete    ", (e: any) => {
    //   console.log("complete    ", e);
    // });
    owAdInstance?.addEventListener("error    ", (e: any) => {
      console.log("error    ", e);
    });
  }, [owAdInstance, onWindowStateChanged]);

  return setContainerOwAD;
};
