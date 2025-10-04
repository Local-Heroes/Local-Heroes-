import React from 'react'
import { loginUser } from '../store/slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {authSchema} from "../schema/authSchema"




function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error} = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
  });


  const onSubmit = async (data) => {
    try{
     await dispatch(loginUser(data)).unwrap();
     navigate("/Nominate")

      

    }catch (error) {
      console.log(error)
    }
    
  };



  

  return (
 <div>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {error.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
 </div>
  
  )
}

export default Login