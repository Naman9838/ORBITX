
const stars = Array.from({ length: 220 }, (_, index) => {
  const left = (index * 47.73) % 100;
  const top = (index * 67.31) % 100;

  // Planet exclusion zone: centered in the hero
  const centerX = 50;
  const centerY = 50;

  // Larger than the visible planet to provide clearance
  const radiusX = 24;
  const radiusY = 49;

  const x = (left - centerX) / radiusX;
  const y = (top - centerY) / radiusY;

  const isOutsidePlanet = x * x + y * y > 1;

  return {
    id: index,
    left,
    top,
    visible: isOutsidePlanet,
    size: index % 12 === 0 ? 4 : index % 5 === 0 ? 3 : 2,
    delay: `${(index % 10) * 0.35}s`,
    duration: `${1.5 + (index % 5) * 0.6}s`,
  };
}).filter((star) => star.visible);

const Starfield = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute block rounded-full bg-white animate-star-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            boxShadow:
              star.size === 4
                ? "0 0 7px 2px #fff, 0 0 18px 6px rgba(34,211,238,0.9)"
                : "0 0 5px 1px #fff, 0 0 12px 3px rgba(34,211,238,0.65)",
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
