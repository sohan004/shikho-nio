import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, useNavigation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import { HashLoader } from 'react-spinners';
import Footer from './components/Footer/Footer'
import { AuthContex } from './components/AuthProvider/AuthProvider'

function App() {
  const navigation = useNavigation()
  const {tf} = useContext(AuthContex)

  return (
    <div className={`${tf ? 'bg-white' : 'bg-gray-950'}`}>
      <div className='max-w-screen-xl mx-auto p-2'>
        <Nav></Nav>
        {navigation.state === 'loading' ? <div className='flex justify-center items-center mt-8'>
          <HashLoader color="#6A6662" />
        </div> : <Outlet></Outlet>}
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App
