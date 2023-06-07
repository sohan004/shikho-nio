import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'

function App() {

  return (
    <div className='max-w-screen-xl mx-auto'>
      <Nav></Nav>
      <Outlet></Outlet>
    </div>
  )
}

export default App
