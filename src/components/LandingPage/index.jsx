import React from 'react'
import { Link } from 'react-router-dom' 
import './index.css'
import mundo3 from './mundo3.MOV'

export default function LandingPage() {
  return (
    <div className='main'>
      <section className='showcase'>
        <div className='video-container'>
          <video src={mundo3} autoPlay loop muted></video>
        </div>
        <div className='content'>
          <h1 className='title'>WELCOME TO THE WORLD</h1>
          <Link to ='/home' >
          <button className='button'>
            EXPLORE!
          </button>
          </Link>
        </div>
      </section>
    </div>
  )
}