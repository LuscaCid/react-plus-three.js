import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import React from 'react'
import {skills, experiences} from '../constants'

const About = () => {
  return (
    <section className='max-container flex flex-col align-center justify-center ' >
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
          I still don't have experience in the area of ​​software development, I'm looking for my first job opportunity and I'm continuing my studies consistently to achieve this goal, I have a lot of experience with personal fullstack projects developed mostly just by me.
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
    </section>
  )
}

export default About