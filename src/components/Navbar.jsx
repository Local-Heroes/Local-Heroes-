import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Plus, LogIn, Menu, X, LogOut } from "lucide-react";
import { useSelector } from "react-redux";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
 
  const { isAuthenticated, user ,token} = useSelector((state) => state.auth);
 



  const handleLogout = async() => {
    try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Remove token from client storage
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop & Tablet Navigation */}
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-black font-bold text-xl sm:text-2xl ml-2 sm:ml-10"
          >
            <Users
              size={40}
              className="rounded-2xl bg-purple-500 text-white p-2"
            />
            <span>Local Heroes</span>
          </Link>

          {/* Middle Nav Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-1 text-orange-500 text-lg hover:bg-orange-200 transition rounded-md px-2 py-1"
            >
              <Users size={18} />
              <span>Heroes</span>
            </Link>

            <Link
              to={`${isAuthenticated ? "/nominate" : "/login"}`}
              className="flex items-center gap-1 text-lg rounded-md hover:bg-orange-200 transition px-2 py-1"
            >
              <Plus size={20} />
              <span>Nominate</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4 mr-4">
            {isAuthenticated ? (
              // ✅ Profile + Logout Section
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="ml-2 text-gray-700 font-medium">
                    {user?.name || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              // Sign In button haddii aan la login-gelin
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-orange-500 text-white shadow hover:bg-orange-600 transition"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 rounded-md border bg-blue-700"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col gap-4 mt-4 md:hidden items-center">
            <Link
              to="/"
              className="flex items-center gap-1 rounded-md hover:bg-orange-200 transition px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              <Users size={18} />
              <span>Heroes</span>
            </Link>

            <Link
              to="/nominate"
              className="flex items-center gap-1 hover:bg-orange-200 rounded-md transition px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              <Plus size={20} />
              <span>Nominate</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold uppercase">
                    {user?.username?.charAt(0) || "U"}
                  </div>
                  <span className="ml-2 text-gray-700 font-medium">
                    {user?.username || "User"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-gray-600 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-orange-500 text-white shadow hover:bg-orange-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
