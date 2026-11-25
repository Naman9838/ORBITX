import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Planet from "./Planet";
const planetSettings = {
  earth: {
    color: "#168bd2",
    roughness: 0.8,
    metalness: 0.1,
  },
  moon: {
    color: "#a6a6a6",
    roughness: 1,
    metalness: 0,
  },
  mars: {
    color: "#c65b35",
    roughness: 0.9,
    metalness: 0,
  },
};

const EarthSurface = () => {
  const earthTexture = useLoader(
    TextureLoader,
    "/textures/earth.jpg"
  );

  return (
    <meshStandardMaterial
      map={earthTexture}
      roughness={0.8}
    />
  );
};

const SpaceScene = ({ destination = "earth" }) => {
  const planet = planetSettings[destination] ?? planetSettings.earth;

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>

      <ambientLight intensity={1.8} />
      <directionalLight
        position={[3, 2, 4]}
        intensity={2.5}
      />

        <Planet destination={destination} settings={planet} position={[0, 0, 0]} />
     
    </Canvas>
  );
};

export default SpaceScene;
