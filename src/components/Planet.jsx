
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Color,
  TextureLoader,
} from "three";

const Planet = ({ destination, settings, position = [0, 0, 0] }) => {
  const planetRef = useRef(null);

  const [earthTexture, moonTexture, marsTexture] = useLoader(
    TextureLoader,
    [
      "/textures/earth.jpg",
      "/textures/moon.jpg",
      "/textures/mars.jpg",
    ]
  );

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[1, 64, 64]} />

      
<meshStandardMaterial
  map={
    destination === "moon"
      ? moonTexture
      : destination === "mars"
        ? marsTexture
        : earthTexture
  }
  roughness={destination === "mars" ? 0.9 : 1}
  metalness={0}
/>

      <mesh scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          transparent
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
          uniforms={{glowColor: {
  value: new Color(
    destination === "mars"
      ? "#ff7043"
      : destination === "moon"
        ? "#b8c7d9"
        : "#42cfff"
  ),
},
            glowStrength: { value: 0.35 },
            glowPower: { value: 5.0 },
          }}
          vertexShader={`
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec4 viewPosition =
          modelViewMatrix * vec4(position, 1.0);

        vNormal = normalize(normalMatrix * normal);
        vViewPosition = -viewPosition.xyz;

        gl_Position =
          projectionMatrix * viewPosition;
      }
    `}
          fragmentShader={`
      uniform vec3 glowColor;
      uniform float glowStrength;
      uniform float glowPower;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        float edge = 1.0 - max(
          dot(normalize(vNormal), normalize(vViewPosition)),
          0.0
        );

        float glow = pow(edge, glowPower) * glowStrength;

        gl_FragColor = vec4(glowColor, glow);
      }
    `}
        />
      </mesh>

    </mesh>
  );
};

export default Planet;
