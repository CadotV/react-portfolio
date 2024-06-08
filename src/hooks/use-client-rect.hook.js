import React from "react";

export default function useClientRect() {
  const [rect, setRect] = React.useState(null);

  const ref = React.useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [ref, rect];
}
