
import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  SRGBColorSpace,
  BackSide,
} from "three";

/* =========================================
   3D TEXTURED EARTH
========================================= */

const Earth = () => {
  const earthRef = useRef(null);

  // Load your existing Earth texture
  const earthTexture = useLoader(
  TextureLoader,
  "/textures/earth.jpg"
);

  useEffect(() => {
    earthTexture.colorSpace = SRGBColorSpace;
    earthTexture.anisotropy = 8;
    earthTexture.needsUpdate = true;
  }, [earthTexture]);

  // Continuous Earth rotation
  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.055;
    }
  });

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 96, 96]} />

        <meshStandardMaterial
          map={earthTexture}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh scale={1.055}>
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#48BCEB"
          transparent
          opacity={0.18}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh scale={1.09}>
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#268DCB"
          transparent
          opacity={0.07}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* =========================================
   SATELLITE
========================================= */

const Satellite = () => {
  return (
    <svg
      viewBox="0 0 100 70"
      className="h-12 w-16 drop-shadow-[0_0_10px_rgba(232,199,122,0.55)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 25L17 13L9 19L31 34"
        fill="#9CA3AF"
        stroke="#D1D5DB"
        strokeWidth="2"
      />

      <path
        d="M62 25L83 13L91 19L69 34"
        fill="#9CA3AF"
        stroke="#D1D5DB"
        strokeWidth="2"
      />

      <path
        d="M38 45L17 57L9 51L31 36"
        fill="#64748B"
        stroke="#94A3B8"
        strokeWidth="2"
      />

      <path
        d="M62 45L83 57L91 51L69 36"
        fill="#64748B"
        stroke="#94A3B8"
        strokeWidth="2"
      />

      <rect
        x="37"
        y="23"
        width="26"
        height="24"
        rx="5"
        fill="#D6B66F"
        stroke="#F3D99A"
        strokeWidth="2"
      />

      <path
        d="M50 23V12M44 12H56"
        stroke="#E8C77A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="50"
        cy="35"
        r="5"
        fill="#0F263B"
        stroke="#F3D99A"
        strokeWidth="2"
      />
    </svg>
  );
};

/* =========================================
   SIGNUP SPACE BACKGROUND
========================================= */

const SignupSpaceBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#03050B]">

      {/* Stars */}
      <div className="signup-stars absolute inset-0" />

      {/* Deep space lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(16,76,112,0.16),transparent_48%)]" />

      {/* Blue nebula */}
      <div className="signup-atmosphere absolute left-[75%] top-[42%] h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[65px]" />

      {/* Distant violet nebula */}
      <div className="absolute left-[20%] top-[25%] h-[400px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-[130px]" />

      {/* Golden ambient light */}
      <div className="absolute left-[65%] top-[75%] h-[300px] w-[500px] rounded-full bg-amber-500/[0.045] blur-[110px]" />

      {/* Planet halo */}
      <div className="absolute left-[72%] top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

      {/* ===================================
          REAL 3D EARTH
      =================================== */}

      <div className="absolute left-[72%] top-1/2 h-[clamp(250px,38vw,430px)] w-[clamp(250px,38vw,430px)] -translate-x-1/2 -translate-y-1/2">

        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
          }}
        >
          <ambientLight intensity={0.55} />

          <directionalLight
            position={[-3, 2, 4]}
            intensity={2}
          />

          <Earth />
        </Canvas>

      </div>

      {/* Golden orbital ring */}
      <div className="signup-orbit absolute left-[72%] top-1/2 h-[clamp(330px,48vw,540px)] w-[clamp(500px,76vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-amber-300/30" />

      {/* Moving satellite */}
      <div className="signup-satellite absolute left-[72%] top-1/2">
        <Satellite />
      </div>

      {/* Foreground vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,5,11,0.08)_0%,rgba(3,5,11,0.2)_55%,rgba(3,5,11,0.55)_100%)]" />

    </div>
  );
};

export default SignupSpaceBackground;
