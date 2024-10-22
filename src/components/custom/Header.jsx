import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className= 'p-2 shadow-lg flex items-center justify-between px-3'>
        <img src='/logo.svg' alt='Company Logo'/>
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header