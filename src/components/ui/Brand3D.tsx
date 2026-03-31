'use client'

import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  Environment, 
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  TorusKnot
} from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function Logo3D() {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <Float
        speed={1.5} 
        rotationIntensity={1} 
        floatIntensity={1}
      >
        <TorusKnot args={[1, 0.4, 128, 32]} scale={1.2}>
           <meshStandardMaterial 
            color="#D4AF37"
            metalness={1}
            roughness={0.1}
            envMapIntensity={2}
          />
        </TorusKnot>
      </Float>
    </group>
  )
}

export default function Brand3D() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center overflow-visible">
      {/* 3D CANVAS */}
      <Suspense fallback={<div className="text-gold font-serif animate-pulse">Initializing Luxury...</div>}>
         <Canvas shadows dpr={[1, 2]} className="absolute inset-0">
           <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
           <Environment preset="city" />
           <ambientLight intensity={0.5} />
           <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
           <PointLightAnimation />
           
           <Logo3D />
           
           <ContactShadows 
             position={[0, -2.5, 0]} 
             opacity={0.3} 
             scale={15} 
             blur={2.5} 
             far={1} 
           />
           
           <OrbitControls 
             enableZoom={false} 
             enablePan={false}
             autoRotate
             autoRotateSpeed={0.5}
           />
         </Canvas>
      </Suspense>

      {/* OVERLAY TEXT - LUXURY GLOW */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.5, duration: 1.5 }}
         className="relative z-20 pointer-events-none select-none text-center"
      >
         <h2 className="text-6xl md:text-8xl font-serif font-black tracking-[.6em] text-white mix-blend-overlay drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            VELQORA
         </h2>
         <div className="flex items-center justify-center space-x-8 mt-4 opacity-40">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[.8em] text-gold">Elite Performances</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
         </div>
      </motion.div>
    </div>
  )
}

function PointLightAnimation() {
   const lightRef = useRef<THREE.PointLight>(null!)
   useFrame((state) => {
      const time = state.clock.getElapsedTime()
      lightRef.current.position.set(
         Math.sin(time) * 5,
         Math.cos(time * 0.5) * 5,
         Math.sin(time * 0.2) * 5
      )
   })
   return <pointLight ref={lightRef} intensity={2} color="#D4AF37" />
}
