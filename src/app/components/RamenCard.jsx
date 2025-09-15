const RamenCard = ({ ramen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-full w-full aspect-square rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }} // translucent white card bg
    >
      <img
        className="transition-transform duration-200 ease-in-out hover:scale-110"
        src={ramen.imageSrc}
        alt={ramen.name}
        style={{ width: "104px", height: "104px", imageRendering: "pixelated" }}
      />
      <h2 className="text-center font-semibold" style={{ fontSize: "1.25rem" }}>
        {ramen.name}
      </h2>
    </div>
  );
};

export default RamenCard;
