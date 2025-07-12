import "./LostProgrammer.css";

import { Canvas, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { RefObject } from 'react';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function LostProgrammer() {
  const gltf = useGLTF("./models/lost_programmer.glb");
  const ref = useRef(null);
  const rotationSpeed = useRef(0.1);
  const decelerating = useRef(true);

  useFrame(() => {
    if (!ref.current) return;

    // Rotação contínua
    ref.current.rotation.y += rotationSpeed.current;

    // Desacelera progressivamente
    if (decelerating.current) {
      rotationSpeed.current *= 0.599; // desacelera suavemente

      if (rotationSpeed.current < 0.003) {
        rotationSpeed.current = 0.001; // define a rotação lenta contínua
        decelerating.current = false;  // fim da desaceleração
      }
    }
  });

    return <primitive object={gltf.scene} scale={1.0} ref={ref}/>;

}

type CameraAnimatorProps = {
  orbitControlsRef: RefObject<ThreeOrbitControls | null>;
};

function CameraAnimator({ orbitControlsRef }: CameraAnimatorProps) {
  const { camera } = useThree();
  const animationDone = useRef(false);

  const targetPosition = new Vector3(-0.5, 1.1, 3);
  const initialPosition = useRef(new Vector3(-0.5, 1, 7));

  useEffect(() => {
    camera.position.copy(initialPosition.current);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (animationDone.current) return;

    camera.position.lerp(targetPosition, 0.01);
    camera.lookAt(0, 0, 0);

    if (camera.position.distanceTo(targetPosition) < 0.01) {
      camera.position.copy(targetPosition);
      animationDone.current = true;

      if (orbitControlsRef?.current) {
        orbitControlsRef.current.enabled = true;
        orbitControlsRef.current.update();
      }
    } else {
      if (orbitControlsRef?.current) {
        orbitControlsRef.current.enabled = false;
      }
    }
  });

  return null;
}

export default function ModelViewer() {
    const orbitControlsRef = useRef<ThreeOrbitControls | null>(null);

  return (
    <div className="container-modelViewer">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="night" />
        <OrbitControls ref={orbitControlsRef} enableZoom={false} />
        <CameraAnimator orbitControlsRef={orbitControlsRef} />
        <LostProgrammer />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3} // Só brilha se for mais claro que isso
            luminanceSmoothing={0.9} // Suaviza a transição do brilho
            intensity={2} // Quanto vai brilhar
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
