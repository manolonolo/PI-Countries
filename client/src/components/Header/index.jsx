import React from 'react'
import { Link } from 'react-router-dom';
import'./index.css'

export default function Header() {

  return (
    <div className='cntheader'>
      <Link className='linkheader' to={'/home/activities'}>CREATE ACTIVITY</Link>
    </div>
  )
}
