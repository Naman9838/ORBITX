
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "./services/firebase";
import DestinationSelector from "./components/DestinationSelector";
import SpaceScene from "./components/SpaceScene";
import DiscoveryExplorer from "./components/DiscoveryExplorer";

const Home = () => {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState("earth");

    const currentUser = auth.currentUser;
    const isGuest = currentUser?.isAnonymous === true;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#03060d] text-white">

            {/* Space background */}
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=90')",
                }}
            />

            {/* Dark overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03060d]/30 via-[#03060d]/60 to-[#03060d]" />

            {/* Navigation */}
            <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10">

                <div className="text-xl font-black tracking-[0.22em]">
                    ORBIT<span className="text-cyan-400">X</span>
                    <span className="mt-1 block text-[9px] font-medium tracking-[0.32em] text-slate-400">
                        BEYOND THE KNOWN
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">

                    {/* Guest mode indicator */}
                    {isGuest && (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-[10px] font-bold tracking-widest text-amber-300">
                            GUEST MODE
                        </span>
                    )}

                    <button
                        onClick={() => navigate("/discover")}
                        className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-semibold tracking-wider text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                    >
                        DISCOVER ↗
                    </button>

                    <button
                        onClick={handleLogout}
                        className="rounded-full border border-white/20 px-4 py-2 text-xs tracking-wider transition hover:border-red-400 hover:text-red-300"
                    >
                        {isGuest ? "EXIT GUEST MODE ↗" : "SIGN OUT ↗"}
                    </button>

                </div>
            </header>

            {/* Hero section */}
            <section className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-16 sm:px-10 lg:min-h-[70vh] lg:grid-cols-2">

                <div>
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                        <span className="text-xs tracking-[0.25em] text-cyan-300">
                            EXPLORATION SYSTEM / INITIALIZED
                        </span>
                    </div>

                    <p className="mb-4 text-sm tracking-[0.25em] text-slate-400">
                        YOUR UNIVERSE. YOUR PERSPECTIVE.
                    </p>

                    <h1 className="text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl">
                        THE
                        <br />
                        UNIVERSE
                        <br />
                        <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-400 bg-clip-text text-transparent">
                            IS
                        </span>
                        <br />
                        <span className="text-slate-500">
                            EXPANDING LET&apos;S EXPLORE.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-sm leading-7 text-slate-400">
                        Explore orbital worlds, uncover celestial mysteries, and follow
                        humanity&apos;s journey into the unknown.
                    </p>

                    <a
                        href="#mission-log"
                        className="mt-8 inline-flex rounded-full bg-cyan-300 px-6 py-4 text-xs font-bold tracking-widest text-slate-950 transition hover:bg-white"
                    >
                        BEGIN EXPLORATION ↗
                    </a>
                </div>

                {/* Space visualization */}
                <div className="relative mx-auto w-full max-w-lg">
                    <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative aspect-square">
                        <div className="absolute inset-[8%] rounded-full border border-cyan-300/20" />

                        <div className="absolute inset-[18%] rounded-full border border-dashed border-white/20" />

                        <div className="absolute inset-[12%] animate-[spin_40s_linear_infinite] rounded-full border border-transparent border-t-cyan-300">
                            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cyan-300" />
                        </div>

                        <div className="absolute inset-[15%] flex items-center justify-center rounded-full border border-cyan-100/30 shadow-[0_0_80px_rgba(34,211,238,0.2)]">
                            <div className="h-[350px] w-full sm:h-[450px]">
                                <SpaceScene destination={activePanel} />
                            </div>
                        </div>

                        <div className="absolute left-0 top-[25%] rounded-lg border border-white/10 bg-slate-950/80 p-3 backdrop-blur-xl">
                            <p className="text-[9px] tracking-widest text-slate-500">
                                SELECTED DESTINATION
                            </p>

                            <p className="mt-1 font-bold text-cyan-300">
                                {activePanel.toUpperCase()}
                            </p>
                        </div>

                        <div className="absolute bottom-[15%] right-0 rounded-lg border border-white/10 bg-slate-950/80 p-3 backdrop-blur-xl">
                            <p className="text-[9px] tracking-widest text-slate-500">
                                FLIGHT MODE
                            </p>

                            <p className="mt-1 text-xs text-white">
                                EXPLORATION
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-[9px] tracking-[0.3em] text-slate-500">
                        CELESTIAL VISUALIZATION / CONCEPT INTERFACE
                    </p>
                </div>
            </section>

            {/* Destination selector */}
            <section
                id="mission-log"
                className="relative z-10 border-t border-white/10 bg-black/30 px-6 py-10 sm:px-10"
            >
                <div className="mx-auto max-w-[1600px]">
                    <DestinationSelector
                        selectedDestination={activePanel}
                        onSelect={setActivePanel}
                    />
                </div>
            </section>

            {/* Discovery Explorer */}
            <section
                id="discoveries"
                className="relative z-10 border-t border-white/10 bg-[#03060d]/90 px-6 py-12 sm:px-10"
            >
                <div className="mx-auto max-w-[1600px]">
                    <DiscoveryExplorer destination={activePanel} />
                </div>
            </section>

        </main>
    );
};

export default Home;
