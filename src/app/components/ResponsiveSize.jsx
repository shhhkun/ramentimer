import { useState, useEffect } from "react";

const ResponsiveSize = () => {
  const [size, setSizes] = useState({
    ramenImage: 104,
    icon: 32,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newSizes = {};

      if (windowWidth >= 1024) {
        newSizes = {
          ramenImage: 416,
          icon: 56,
        }; // lg size
      } else if (windowWidth >= 640) {
        newSizes = {
          ramenImage: 208,
          icon: 44,
        }; // sm size
      } else {
        newSizes = {
          ramenImage: 104,
          icon: 32,
        }; // default size
      }
      setSizes(newSizes);
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default ResponsiveSize;