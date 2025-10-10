import React from "react";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, } from "react-redux";
import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import {loginSchema} from '../schema/authSchema'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/AuthSlice";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);



  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(loginSchema)
  });

 const onSubmit = async (data) => {
  try {
    const result = await dispatch(loginUser(data)).unwrap();
    localStorage.setItem("token", result.token);
     toast.success("Login successful"); 
  
     setTimeout(() => {
      navigate('/');
     }, 2000); 

   
  } catch (error) {
     toast.error(error.error || "Login failed");
    setError(error.error || "Login failed");
  }
};


  return (
    <div className="flex flex-col items-center mt-8 min-h-screen bg-gray-50 px-4">
      <ToastContainer />
      {/* Back Link */}
      <div className="w-full max-w-md mb-4">
        <Link
          to="/"
          className="flex items-center text-sm text-orange-500 hover:underline"
        >
          ← Back to Heroes
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8  sm:h-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-orange-400 p-3 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25m0 0A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m7.5 0H6.75m0 0V5.25m0 3.75h7.5M12 15.75a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to thank heroes and share your appreciation
        </p>

         {error && ( 
        <p className="text-red-500 text-center mb-4">{error}</p>
        )
      }

        {/* Form */}
        <form
        onSubmit={handleSubmit(onSubmit)}
        >
      
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="email"
                 {...register("email")}
                id="email"
                placeholder="user1@gmail.com"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="password"
                id="password"
                  {...register("password")}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500
             text-white py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
