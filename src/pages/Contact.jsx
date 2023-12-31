
import { Suspense, useRef } from "react"
import { useState } from "react"
import emailjs from '@emailjs/browser'
import { Canvas } from "@react-three/fiber"
import Fox from '../models/Fox'
import Loader from '../components/Loader'
import useAlert from "../hooks/useAlert"
import Alert from '../components/Alert'

const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({name : '', email : "", message : ""})
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('idle')
  const {hideAlert,showAlert,alert} = useAlert()

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentAnimation('hit')
    setIsLoading(true)
    console.log(import.meta.env.VITE_APP_SERVICE_ID)
    emailjs.send(
      import.meta.env.VITE_APP_SERVICE_ID,
      import.meta.env.VITE_APP_TEMPLATE_ID,
      {
        from_name : form.name,
        to_name : "Lucas Cid",
        from_email : form.email,
        to_email : "lucasfelipelimacid@gmail.com",
        message : form.message
      },
      import.meta.env.VITE_APP_PUBLIC_KEY_ID
      
    ).then(() => {
      setIsLoading(false)
      showAlert({ show : true, text : "message sent successfully", type : "success"})
      setTimeout(() => {
        hideAlert()
        setCurrentAnimation('idle')
        setForm({name : '', email : '', message : ''})
      }, [3000]);
    }).catch((error) => {
      setCurrentAnimation('idle')
      setIsLoading(false)
      console.log(error)
      showAlert({ show : true, text : "i didtn receive your message", type : "danger"})
    })
  }
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
    
  }
  const handleFocus = () => setCurrentAnimation('walk')
  const handleBlur = () => setCurrentAnimation('idle')
  return (
    <section 
    className='relative flex lg:flex-row flex-col max-container h-[100vh]'
    >
    {alert.show && <Alert {...alert}/>}
      <div className='flex-10 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>
          Get in Touch
        </h1>
      
      <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className='w-full flex flex-col gap-4 mt-14'>
        <label className='text-black-500 font-semibold'>Name</label>
        <input
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={form.name}
        required
        placeholder='Jhon'
        className='input'
        name='name' 
        type="text" />
        <label className='text-black-500 font-semibold'>E-mail</label>
        <input
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={form.email}
        required
        placeholder='E-mail'
        className='input'
        name='email' 
        type="email" />
        <label className='text-black-500 font-semibold'>Message</label>
        <textarea
        
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={form.message}
        required
        placeholder='Let me know how i can help you!'
        className='textarea resize-none'
        name='message' 
        type="text" />
        <button
        disabled = {isLoading} 
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="btn"
        type="submit">
          {isLoading ? "sending..." : "send message"}
        </button>
      </form>
      </div>
      <div
      className = "lg:2-1/2 w-full lg:h-auto md:h-[550px] h-[350px]"
      >
        <Canvas
        camera={{
          far : 1000,
          near : 0.1,
          fov : 75,
          position : [0,0,5]
        }}
        
        >
          <ambientLight 
          intensity={0.4}
          /> 
          <directionalLight 
          intensity={2.5}
          position={[0,0,1]}
          />
          <Suspense fallback = {<Loader/>}>
            <Fox
            currentAnimation={currentAnimation}
            position = {[0.5, 0.35, 0]}
            rotation = {[12.6, -0.6, 0]}
            scale = {[0.65,0.65,0.65]}
            />
          </Suspense>
            
          
        </Canvas>
      </div>
    </section>
  )
}

export default Contact