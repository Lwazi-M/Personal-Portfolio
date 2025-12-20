/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text, RenderTexture, PerspectiveCamera } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// ⬇️ IMPORTING YOUR ASSETS
import cardGLB from './assets/card.glb'; 
import lanyard from './assets/lanyard.png';
import profileImg from './assets/Me-Profile.jpeg';
 

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const profileTexture = useTexture(profileImg);
  
  // ⬇️ SHIFT EVERYTHING LEFT (X = -1.5 Y = 4.3)
  const xOffset = -1.52; 
  const yOffset = 4.3;  

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
      new THREE.Vector3(xOffset, yOffset, 0), 
      new THREE.Vector3(xOffset, yOffset - 0.5, 0), 
      new THREE.Vector3(xOffset, yOffset - 1, 0),   
      new THREE.Vector3(xOffset, yOffset - 1.5, 0)  
  ]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // ⬇️ PATCH: Cap delta to 0.1s to prevent division-by-zero errors on initialization
    const dt = Math.min(delta, 0.1);

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        // Use 'dt' instead of 'delta' here
        ref.current.lerped.lerp(ref.current.translation(), dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 0, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[xOffset, yOffset, 0]} />
        <RigidBody position={[xOffset, yOffset - 0.5, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[xOffset, yOffset - 1, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[xOffset, yOffset - 1.5, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        
        <RigidBody position={[xOffset, yOffset - 2, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              >
                 {/* ⬇️ RENDER TEXTURE START ⬇️ */}
                 <RenderTexture attach="map" anisotropy={16}>
                    <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
                    <color attach="background" args={['#1a1a1a']} />
                    
                    <group scale={[0.9, -0.9, 0.9]} position={[0, 0, 0]}>
                        
                        <mesh position={[0, 0, -2]}>
                            <planeGeometry args={[10, 10]} />
                            <meshBasicMaterial color="#1a1a1a" />
                        </mesh>

                        <Text fontSize={0.14} color="white" position={[-1.3, 1.7, 0]} anchorX="center" anchorY="middle">
                            SOFTWARE ENGINEER
                        </Text>

                        <Text fontSize={0.22} color="white" position={[-1.3, 2, 0]} anchorX="center" anchorY="middle" fontWeight="bold">
                            Lwazi Mhlongo
                        </Text>

                        <mesh position={[-1.51, 0.24, -0.9]}>
                            <planeGeometry args={[1.89, 2.71]} />
                            <meshBasicMaterial color="white" />
                        </mesh>
                        <mesh position={[-1.3, 0.2, 0]}>
                            <planeGeometry args={[1.6, 2.3]} />
                            <meshBasicMaterial map={profileTexture} />
                        </mesh>
                    </group>
                 </RenderTexture>
                 {/* ⬆️ RENDER TEXTURE END ⬆️ */}
              </meshPhysicalMaterial>
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}