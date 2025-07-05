import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import React from 'react'
import {skills, experiences} from '../constants'
import CTA from '../components/CTA'

const About = () => {
  return (
    <section className='max-container' >
      <h1 className='head-text'>Hello, I'm  
        <span className='blue-gradient_text font-semibold drop-shadow'> Lucas Cid</span>
      </h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Software engineer based in Brazil, specialized in backend and in the frontend, always keeping on progress and trying to learn every time.
        </p>
      </div>
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
             <div className='block-container w-20 h-20'>
              <div className='btn-back rounded-x1'/>
              <div className='btn-font rounded-x1 flex justify-center items-center'>
                <img src={skill.imageUrl} alt={skill.name} 
                className='w-1/1.4 h-1/1.4 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work experience</h3>
        <div>
          <p className='mt-5 flex flex-col gap-3 text-slate-500'>
          I have 3 years of experience in software development, I worked as a freelance developer, I worked in a team at W5i Tecnologia, always taking care to create structures that met needs in a dynamic way, ensuring clean code and simplicity of use and, above all, clarity. At the moment, I'm working on a personal project that is designed to manage flows within companies based on nodes with conditionals and beyond.
          </p>
        </div>
        <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map(element => (
                <VerticalTimelineElement key={element.company_name}
                date= {element.date}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img 
                    src={element.icon} 
                    alt={element.company_name} 
                    className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                iconStyle={{background :element.iconBg}}
                contentStyle={{
                  borderBottom : "8px",
                  borderStyle: 'solid',
                  borderBottomColor: element.iconBg,
                  boxShadow : 'none'
                }}
                >
                  <div>
                    <h3 className='text-black text-x1 font-poppins font-semibold'>
                      {element.title}
                    </h3>
                    <p className='text-black-500 font-medium font-base' style={{margin :0}}>
                      {element.company_name}
                    
                    </p>
                  </div>
                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {element.points.map((each, index) => (
                      <li key={`experience-point-${index}`} className='text-black-500/50 font-normal pl-1 text-sm'>
                        {each}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
        </div>
      </div>
      <hr className='border-slate-200'/>

      <CTA/>
    </section>
  )
}

export default About
