
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Plus, LogIn, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
        
          <Link
            to="/"
            className="flex items-center gap-2 text-black font-bold text-xl sm:text-2xl ml-10"
          >
            <Users
              size={40}
              className="rounded-2xl bg-purple-500 text-white p-2"
            />
            <span>Local Heroes</span>
          </Link>

         
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link
              to="/heroes"
              className="flex items-center gap-1 text-orange-500 text-lg  
               hover:bg-orange-200 transition rounded-md"
            >
              <Users size={18} />
              <span>Heroes</span>
            </Link>

            <Link
              to="/nominate"
              className="flex items-center gap-1 text-lg  rounded-md hover:bg-orange-200 
              transition"
            >
              <Plus size={20} />
              <span>Nominate</span>
            </Link>
           
          </div>

        
          
          <div className="hidden md:flex">
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-orange-500 text-white shadow hover:bg-orange-600 transition mr-8"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          </div>

         
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 rounded-md border bg-blue-700"
          >
            {isOpen ? <X size={24} className="text-white " /> : <Menu size={24} className="text-white" />}
          </button>
        </nav>


        {isOpen && (
          <div className="flex flex-col gap-4 mt-4 md:hidden  items-center ">
            <Link
              to="/heroes"
              className="flex items-center gap-1 rounded-md   hover:bg-orange-200 transition"
            >
              <Users size={18} />
              <span>Heroes</span>
            </Link>

            <Link
              to="/nominate"
              className="flex items-center gap-1  hover:bg-orange-200 rounded-md transition"
            >
              <Plus size={20} />
              <span>Nominate</span>
            </Link>
            

            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-orange-500 text-white shadow hover:bg-orange-600 transition"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
           

          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;