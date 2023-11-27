import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import PlaneScene from '../assets/3d/plane.glb'

const Plane = ({isRotating, ...props}) => {
  const ref = useRef()
  const {scene, animations} = useGLTF(PlaneScene)
  const {actions } = useAnimations(animations, ref)
  
  useEffect(()=> {
    isRotating ? actions['Take 001'].play() : actions['Take 001'].stop() 
    
  }, [actions, isRotating])

  return (
    <mesh {...props} ref = {ref}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Plane