import React from "react";

function useOutsideClick(ref) {
  const [clickOutside, setClickOutside] = React.useState(false);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickOutside(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return clickOutside;
}

export default useOutsideClick;
