
import DiscoverNavbar from "../components/DiscoverNavbar";
import FeaturedPlanet from "../components/FeaturedPlanet";
import ContinueWatching from "../components/ContinueWatching";
import UniverseSection from "../components/UniverseSection";

const Discover = () => {
  return (
    <div className="min-h-screen bg-[#03050B] text-white">
      <DiscoverNavbar />
      <FeaturedPlanet />
      <ContinueWatching />
      <UniverseSection />
    </div>
  );
};

export default Discover;
