import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/character.glb';


export default function Model({ mousePosRef }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(MODEL_PATH);

  // Play first animation if the GLB has any
  const { actions, names } = useAnimations(animations, groupRef);
  useEffect(() => {
    if (names.length > 0) {
      const firstAction = actions[names[0]];
      firstAction?.reset().fadeIn(0.5).play();
      return () => { firstAction?.fadeOut(0.5); };
    }
  }, [actions, names]);

  // Auto-center and auto-scale the model to fill the viewport nicely
  const { offset, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 3.2; // world-space units the model should span
    const computedScale = targetSize / (maxDim || 1);

    return {
      offset: center.clone().multiplyScalar(-computedScale),
      scale: computedScale,
    };
  }, [scene]);

  // Idle animation refs
  const clock = useRef(0);
  const targetRotY = useRef(0);
  const currentRotY = useRef(0);
  const targetRotX = useRef(0);
  const currentRotX = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    clock.current += delta;

    // Subtle floating bob
    groupRef.current.position.y = offset.y + Math.sin(clock.current * 0.6) * 0.06;

    // Mouse-follow: map normalised [-1,1] mouse to gentle tilt/pan
    const mp = mousePosRef?.current;
    if (mp) {
      targetRotY.current = mp.x * 0.35;
      targetRotX.current = -mp.y * 0.2;
    }

    // Smooth lerp toward target rotation
    currentRotY.current = THREE.MathUtils.lerp(currentRotY.current, targetRotY.current, delta * 3);
    currentRotX.current = THREE.MathUtils.lerp(currentRotX.current, targetRotX.current, delta * 3);

    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = currentRotX.current;
  });

  return (
    <group
      ref={groupRef}
      position={[offset.x, offset.y, offset.z]}
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} />
    </group>
  );
}
