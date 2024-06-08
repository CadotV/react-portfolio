import React from "react";

const useScreenDetector = (
  mobileWidth = 768,
  tabletWidth = 1024,
  desktopWidth = 1024
) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= mobileWidth;
  const isTablet = width <= tabletWidth;
  const isDesktop = width <= desktopWidth;

  return { isMobile, isTablet, isDesktop };
};

export default useScreenDetector;
