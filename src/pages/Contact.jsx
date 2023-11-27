
import { useRef } from "react"
import { useState } from "react"
import emailjs from '@emailjs/browser'


const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name : '', email : "", message : ""})
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault();
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
      // TODO: Show success messagem 
      // TODO: Hide an alert 
    }).catch((error) => {
      setIsLoading(false)
      console.log(error)
    })
  }
  
  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
    
  }
  const handleFocus = () => {
  }
  const handleBlur = () => {

  }
  return (
    <section 
    className='relative flex lg:flex-row flex-col max-container'
    >
      <div className='flex-10 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>
          Get in Touch
        </h1>
      </div>
      <form 
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
    </section>
  )
}

export default Contact