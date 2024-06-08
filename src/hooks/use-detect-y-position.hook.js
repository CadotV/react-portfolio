import React from "react";

// TODO: Same as useReachNodeBottom hook, except it use number instead of node ref. Remove one

const useDetectYPosition = (offsetTop) => {
  const [reachY, setReachY] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= offsetTop) {
        setReachY(true);
      } else {
        setReachY(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return reachY;
};

export default useDetectYPosition;
