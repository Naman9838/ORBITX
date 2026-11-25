
const destinations = [
  {
    id: "earth",
    name: "Earth",
    subtitle: "Our pale blue home",
    code: "DEST-001",
  },
  {
    id: "moon",
    name: "Moon",
    subtitle: "The lunar frontier",
    code: "DEST-002",
  },
  {
    id: "mars",
    name: "Mars",
    subtitle: "The next horizon",
    code: "DEST-003",
  },
];

const DestinationSelector = ({ selectedDestination, onSelect }) => {
  const activeDestination = destinations.find(
    (destination) => destination.id === selectedDestination
  );

  return (
    <section className="w-full max-w-xl">
      <p className="mb-3 text-xs tracking-[0.3em] text-cyan-300">
        NAVIGATION SYSTEM / 001
      </p>

      <h2 className="text-2xl font-semibold tracking-tight text-white">
        Select your destination
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Choose a world to prepare your exploration interface.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination.id)}
            aria-pressed={selectedDestination === destination.id}
            className={`rounded-xl border p-3 text-left transition duration-300 sm:p-4 ${
              selectedDestination === destination.id
                ? "border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                : "border-white/10 bg-white/[0.02] hover:border-white/30"
            }`}
          >
            <span className="block text-sm font-bold text-white">
              {destination.name}
            </span>

            <span className="mt-2 block text-[10px] tracking-wider text-slate-500">
              {destination.code}
            </span>
          </button>
        ))}
      </div>

      {activeDestination && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[10px] tracking-[0.25em] text-slate-500">
            CURRENT TARGET
          </p>

          <h3 className="mt-2 text-xl font-bold text-cyan-300">
            {activeDestination.name}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {activeDestination.subtitle}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="text-xs text-slate-400">
              Target selected
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationSelector;
