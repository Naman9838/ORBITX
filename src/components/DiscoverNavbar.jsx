import { Link, NavLink } from "react-router-dom";

const DiscoverNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050609]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">

        {/* ORBITX Logo */}
        <Link to="/discover" className="shrink-0">
          <h1 className="text-2xl font-black tracking-[0.2em] text-white">
            ORBIT<span className="text-cyan-400">X</span>
          </h1>
          <p className="mt-0.5 text-[8px] tracking-[0.35em] text-slate-500">
            BEYOND THE KNOWN
          </p>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-7">

          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `text-sm transition-colors duration-300 ${
                isActive
                  ? "font-semibold text-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`
            }
          >
            Discover
          </NavLink>

          <Link
            to="/home"
            className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
          >
            Space Home
          </Link>

        </nav>

      </div>
    </header>
  );
};

export default DiscoverNavbar;