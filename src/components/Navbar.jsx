import React from 'react'
import { Link } from "react-router-dom";
import { Users, Plus,LogIn } from "lucide-react";
import Herosection from './HeroSection';


function Navbar() {
  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto py-4 px-4'>
        <nav className="flex items-center justify-between">
          <div className='gap-6 ml-10'>
          <Link
            to="/" className="flex items-center gap-2 text-black font-bold text-2xl"

          >
            <Users size={50} className="rounded-2xl bg-purple-500 text-white font-medium  py-2 px-2" />
            <span>Local Heroes</span>

          </Link>
          </div>
          <div className="flex py-2 px-3 justify-between gap-6">
            <div className='bg-amber-100 rounded-md shadow'>
            <Link
              to="/Herosection" className="flex items-center gap-0 text-red-300 text-2xl px-2 py-2 "

            >
              <Users size={20}/>
              <span>Heroes</span>
            </Link>
            </div>
            <div>
            <Link to="/" className="flex items-center gap-0 text-black  text-2xl">
            <Plus size={20} />
             <span>Nominate</span> 
           
            </Link>
            </div>
          </div>

       
          <div  className="rounded-md bg-orange-500  text-white font-medium shadow hover:bg-orange-600 mr-8" >
          <Link
                  to="/"
                  className="flex items-center gap-1 px-3 py-2 rounded-md transition-colors"
                 
                >
                  <LogIn size={18} />
                  <span>sign in</span>
                </Link>
     

          </div>
        </nav>
      </div>

    </header>
  )
}

export default Navbar;