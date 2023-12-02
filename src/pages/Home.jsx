import {Suspense, useState, useEffect, useRef} from 'react'

import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import {Island}  from '../models/island'
import  Sky from '../models/Sky'
import Bird from '../models/bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'

const Home = () => {
  const audioRef = useRef(new Audio(sakura))
  audioRef.current.volume = 0.4
  audioRef.current.loop = true
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)

  useEffect(() =>{
    if(isPlayingMusic)audioRef.current.play()
    return () => {
      audioRef.current.pause()
    }
  }, [isPlayingMusic])

  const adjustPlaneForScreenSize = () =>{
    let screenScale, screenPosition;

    if(window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [ 4 ,3 ,3]
      screenPosition = [0, 4, 4]

    }
    return [ screenScale, screenPosition]
  }

  const adjustIslandForScreenSize = () =>{
    let rotation =  [0.1, 4.7, 0 ]
    let screenScale = null;
    let screenPosition = [0,-6.5 ,-43]  ;

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9 ,0.9]   
      screenPosition = [0, -6.5 ,-43]
    } else {
      screenScale = [ 1 ,1 ,1]
    }
    return [ screenScale, screenPosition, rotation]
  }

  const [ islandScale, islandPosition , rotation ] = adjustIslandForScreenSize()

  const [planeScale, planePosition] = adjustPlaneForScreenSize()

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 right-0 left-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage = {currentStage}/>}
      </div>
      <Canvas 
      camera={{near : 0.1, far : 1000,}}
      className={`
        w-full h-screen bg-transparent
        ${isRotating ? "cursor-grabbing" : "cursor-grab"}
      `}
      >
        <Suspense fallback= {<Loader />}>
          <directionalLight 
          position={[3,1,1]}
          intensity={2}
          />
          <ambientLight 
          intensity={.3} />
          <hemisphereLight 
          skyColor = "#b1e1ff"
          groundColor="#000"/>
          <Bird/> 
          <Sky
          isRotating={isRotating}
          />
          <Island 
          setCurrentStage={setCurrentStage}
          currentStage = {currentStage}
          rotation = { rotation }
          position = { islandPosition }
          scale = { islandScale }
          isRotating={ isRotating }
          setIsRotating={setIsRotating}
          />
          <Plane 
          isRotating = { isRotating }
          planePosition = { planePosition }
          planeScale = { planeScale }
          rotation = { [0, 20, 0] }
          />
        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <img
        onClick={() => {
          setIsPlayingMusic(!isPlayingMusic)
        }}
        className='w-10 h-10 cursor-pointer object-contain' 
        src={!isPlayingMusic ? soundoff : soundon } alt="soud" />
      </div>
    </section>
  )
}

export default Home