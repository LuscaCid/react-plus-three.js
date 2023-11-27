import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import{ arrow }  from '../assets/icons/'
const HomeInfo = ({currentStage}) => {
  
  const [displayInfo, setDisplayInfo] = useState('')
  
  const InfoBox = ({text, link, btnText}) => (
    <div className='info-box'>
      <p className='font-medium sm:text-1 text-center'>{text}</p>
      <Link 
      className='neo-brutalism-white neo-btn'
      to={link}>
        {btnText}
        <img src={arrow}/>
      </Link>
    </div>
  )
  
  const renderContent = {
    
    1 : (
      <h1 className='sm:text-x1 sm:leading-snug text-center neo-brutalism-blue py-3 px-5 text-white mx-4 '>Hello, <span className='font-semibold'>Lucas 👋</span>
      <br />
      A software engineer from Brazil that loves programming.
      </h1>
    ),
    2 : (
      <InfoBox 
        text="Led multiple projects to success over the years. Curious about the impact?"
        link='/projects'
        btnText = "Visit my portfolio "
      />
     
    ),
    3 : (
      <InfoBox 
        text="Work at a lot of projects and studying at the one of best institute academic, SENAI and at the same time, in Rocketseat. "
        link='/about'
        btnText = "Learn more"
      />
    ),
    4 : (
      <InfoBox 
        text="Need a project done or looking for a dev? I'm just a few keystrokes away"
        link='/contact'
        btnText = "let's talk"
      />
    ),
  }
  
  return (
    <div>{renderContent[currentStage] || null}</div>
  )
}

export default HomeInfo