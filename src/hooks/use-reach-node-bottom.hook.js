import React from "react";

// TODO: Same as useDetectYPosition hook, except it use node ref instead of number. Remove one

export default function useReachNodeBottom(ref) {
  const [reachY, setReachY] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= ref.current.clientHeight) {
        setReachY(true);
      } else {
        setReachY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return reachY;
}
