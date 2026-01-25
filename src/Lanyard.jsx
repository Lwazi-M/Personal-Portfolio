/* eslint-disable react/no-unknown-property */
// ⬆️ This comment tells the linter (code checker) to ignore errors about unknown properties in JSX 
// (because React Three Fiber uses properties that standard React HTML doesn't know about).

import { useEffect, useRef, useState } from 'react';
// ⬆️ useEffect: Runs code when a component loads or updates.
// ⬆️ useRef: Creates a reference to a specific object (like a 3D mesh) so we can control it directly.
// ⬆️ useState: Creates variables that, when changed, tell React to re-render the component.

import { Canvas, extend, useFrame } from '@react-three/fiber';
// ⬆️ Canvas: The main scene container where all 3D objects live.
// ⬆️ extend: Lets us add external Three.js libraries (like MeshLine) to React Three Fiber.
// ⬆️ useFrame: A hook that runs code 60 times per second (for animation loops).

import { useGLTF, useTexture, Environment, Lightformer, Text, RenderTexture, PerspectiveCamera } from '@react-three/drei';
// ⬆️ useGLTF: Loads 3D models (.glb/.gltf files).
// ⬆️ useTexture: Loads images (.png/.jpg) to use as textures (skins) for 3D objects.
// ⬆️ Environment: Sets up realistic lighting using an HDRI map.
// ⬆️ Lightformer: Creates simple shapes that emit light (good for reflections).
// ⬆️ Text: Renders 3D text in the scene.
// ⬆️ RenderTexture: Renders a scene onto a texture (like a screen inside a 3D world).
// ⬆️ PerspectiveCamera: A camera that simulates human vision (things get smaller further away).

import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
// ⬆️ Physics: Wraps the scene to enable gravity and collisions.
// ⬆️ RigidBody: Makes an object physical (it falls, bounces, and hits things).
// ⬆️ Colliders: Invisible shapes (Ball, Cuboid) that define the "hitbox" of an object.
// ⬆️ useRopeJoint: Connects two bodies like a rope (flexible).
// ⬆️ useSphericalJoint: Connects two bodies like a ball-and-socket joint (rotates freely).

import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
// ⬆️ Imports a special library for drawing thick, high-quality lines (used for the lanyard strap).

import * as THREE from 'three';
// ⬆️ Imports the core Three.js library for math (Vectors) and colors.

// ⬇️ IMPORTING YOUR ASSETS
// These lines grab the actual files from your project folder.
import cardGLB from './assets/card.glb'; 
import lanyard from './assets/lanyard.png';
import profileImg from './assets/Me-Profile.jpeg';

// ⬇️ Register MeshLine so we can use <meshLineGeometry /> in JSX
extend({ MeshLineGeometry, MeshLineMaterial });

// ====================================================================
// 1. MAIN COMPONENT: Lanyard
// This is the container that sets up the Scene, Camera, and Lights.
// ====================================================================
export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper">
      {/* Canvas is the window into the 3D world */}
      <Canvas
        camera={{ position: position, fov: fov }} // Sets initial camera position and "Field of View" (zoom)
        gl={{ alpha: transparent }} // Allows the background to be transparent
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)} // Sets background color
      >
        {/* Adds generic light everywhere so things aren't pitch black */}
        <ambientLight intensity={Math.PI} />
        
        {/* Enables the Physics simulation (Gravity, Collisions) */}
        {/* timeStep={1/60} means physics calculates 60 times per second */}
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band /> {/* Renders the actual Lanyard and Card */}
        </Physics>
        
        {/* Environment creates realistic reflections on the card */}
        <Environment blur={0.75}>
          {/* Lightformers are glowing shapes placed around the scene to create nice highlights on the plastic card */}
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// ====================================================================
// 2. INNER COMPONENT: Band
// This handles the physics rope, the card model, and user interaction.
// ====================================================================
function Band({ maxSpeed = 50, minSpeed = 0 }) {
  
  // -- REFS (References to 3D objects) --
  // We use these to manipulate objects directly without re-rendering the whole component.
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  
  // -- VECTORS (Math Helpers) --
  // We reuse these objects to do math calculations (like position/rotation) efficiently.
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  
  // -- PHYSICS PROPS --
  // Standard settings for our physics body (type='dynamic' means it moves).
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  // -- LOAD ASSETS --
  const { nodes, materials } = useGLTF(cardGLB); // Load the 3D model
  const texture = useTexture(lanyard); // Load the strap texture
  const profileTexture = useTexture(profileImg); // Load your profile picture
  
  // ⬇️ POSITION VARIABLES
  // These control where the lanyard hangs from on the screen.
  const xOffset = -1.52; // Moves it Left/Right
  const yOffset = 4.3;   // Moves it Up/Down

  // -- CURVE DEFINITION --
  // Creates a smooth curve path based on 4 points (Start, Joint 1, Joint 2, End).
  // This is the visible "Strap".
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
      new THREE.Vector3(xOffset, yOffset, 0), 
      new THREE.Vector3(xOffset, yOffset - 0.5, 0), 
      new THREE.Vector3(xOffset, yOffset - 1, 0),   
      new THREE.Vector3(xOffset, yOffset - 1.5, 0)  
  ]));
  
  // -- STATE --
  const [dragged, drag] = useState(false); // Is the user currently dragging the card?
  const [hovered, hover] = useState(false); // Is the mouse hovering over the card?

  // -- JOINTS (Connecting the physics bodies) --
  // This chains the invisible physics balls together to act like a rope.
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]); // Anchor -> Joint 1
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);    // Joint 1 -> Joint 2
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);    // Joint 2 -> Joint 3
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]); // Joint 3 -> Card (Rotates freely)

  // -- CURSOR HANDLER --
  // Changes the mouse cursor to a grabbing hand when hovering/dragging.
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // -- ANIMATION LOOP (Runs 60 times per second) --
  useFrame((state, delta) => {
    // ⬇️ PATCH: Prevents physics explosions if the computer lags (big time gap).
    const dt = Math.min(delta, 0.1);

    // 1. DRAG LOGIC
    if (dragged) {
      // Convert 2D mouse coordinates (screen) to 3D world coordinates.
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      // Wake up physics bodies (if they were "sleeping" to save CPU).
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      // Move the card to the mouse position immediately (Kinematic movement).
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }

    // 2. STRAP SIMULATION
    if (fixed.current) {
      // Calculate "Lerped" (smoothed) positions for the joints so the strap doesn't jitter.
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      // Update the visual curve (the strap mesh) to match the invisible physics joints.
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      // Tilt the card slightly based on how fast it is spinning (Angular Velocity).
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  // Settings for the MeshLine (The strap texture settings)
  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 0, 0]}>
        {/* INVISIBLE PHYSICS CHAIN 
           We create 4 rigid bodies. "fixed" is the anchor at the top.
           j1, j2, j3 are the dangling segments.
        */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[xOffset, yOffset, 0]} />
        <RigidBody position={[xOffset, yOffset - 0.5, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[xOffset, yOffset - 1, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[xOffset, yOffset - 1.5, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        
        {/* THE CARD BODY 
           This is the main object at the bottom of the chain.
        */}
        <RigidBody position={[xOffset, yOffset - 2, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} /> {/* The Hitbox of the card */}
          
          {/* VISUAL MESH GROUP */}
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            // Mouse Events
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
          >
            {/* The Actual 3D Model Mesh */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              >
                 {/* ⬇️ RENDER TEXTURE START ⬇️ */}
                 {/* This section renders a 2D scene (Text, Image) onto the 3D card surface */}
                 <RenderTexture attach="map" anisotropy={16}>
                    <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
                    <color attach="background" args={['#1a1a1a']} />
                    
                    <group scale={[0.9, -0.9, 0.9]} position={[0, 0, 0]}>
                        
                        {/* Background Panel on the card */}
                        <mesh position={[0, 0, -2]}>
                            <planeGeometry args={[10, 10]} />
                            <meshBasicMaterial color="#1a1a1a" />
                        </mesh>

                        {/* Text: "SOFTWARE ENGINEER" */}
                        <Text fontSize={0.14} color="white" position={[-1.3, 1.7, 0]} anchorX="center" anchorY="middle">
                            SOFTWARE ENGINEER
                        </Text>

                        {/* Text: "Lwazi Mhlongo" */}
                        <Text fontSize={0.22} color="white" position={[-1.3, 2, 0]} anchorX="center" anchorY="middle" fontWeight="bold">
                            Lwazi Mhlongo
                        </Text>

                        {/* White Border Frame for the Photo */}
                        <mesh position={[-1.51, 0.24, -0.9]}>
                            <planeGeometry args={[1.89, 2.71]} />
                            <meshBasicMaterial color="white" />
                        </mesh>
                        
                        {/* Your Profile Photo */}
                        <mesh position={[-1.3, 0.2, 0]}>
                            <planeGeometry args={[1.6, 2.3]} />
                            <meshBasicMaterial map={profileTexture} />
                        </mesh>
                    </group>
                 </RenderTexture>
                 {/* ⬆️ RENDER TEXTURE END ⬆️ */}
              </meshPhysicalMaterial>
            </mesh>
            
            {/* The Metal Clip meshes (loaded from GLB file) */}
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      
      {/* THE STRAP MESH 
         This draws the visible line connecting the anchor to the card.
         It updates every frame based on the physics joint positions.
      */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}