import { useState } from "react";
export function useSubscribed() {
  const [subscribed, setSubscribed] = useState(true);

  return subscribed;
}
