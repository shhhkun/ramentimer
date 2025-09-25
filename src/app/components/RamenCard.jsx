import { useState, useEffect } from "react";

const useResponsiveSize = () => {
  const [size, setSize] = useState(26);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSize(104); // lg size (516px)
      } else if (window.innerWidth >= 640) {
        setSize(52); // sm size (208px)
      } else {
        setSize(26); // default size (104px)
      }
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

const RamenCard = ({ ramen, onClick }) => {
  const ramenSize=useResponsiveSize();

  return (
    <div
      onClick={onClick}
      className="h-full w-full aspect-square rounded-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 cursor-pointer shadow-md"
      style={{ backgroundColor: "var(--cardbg2)" }} // translucent white card bg
    >
      <img
        className={`aspect-square w-${ramenSize} transition-transform duration-200 ease-in-out hover:scale-110`}
        src={ramen.imageSrc}
        alt={ramen.name}
        style={{
          imageRendering: "pixelated",
        }}
      />
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-semibold whitespace-nowrap">
        {ramen.name}
      </h2>
    </div>
  );
};

export default RamenCard;
