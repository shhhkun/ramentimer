import ResponsiveSize from "./ResponsiveSize";

const RamenCard = ({ ramen, onClick }) => {
  const { ramenImage } = ResponsiveSize();

  return (
    <div
      onClick={onClick}
      className="h-full w-full aspect-square rounded-lg flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 cursor-pointer shadow-md"
      style={{ backgroundColor: "var(--cardbg2)" }} // translucent white card bg
    >
      <img
        className="transition-transform duration-200 ease-in-out hover:scale-110"
        src={ramen.imageSrc}
        alt={ramen.name}
        style={{
          imageRendering: "pixelated",
          width: `${ramenImage}px`,
          height: `${ramenImage}px`,
        }}
      />
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-semibold whitespace-nowrap">
        {ramen.name}
      </h2>
    </div>
  );
};

export default RamenCard;
