// components/Step1.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveStep1Data } from '../../store/slices/heroesSlice';
import {User } from "lucide-react"

const Step1 = ({ onNext }) => {
  const dispatch = useDispatch();
  const { nominationData } = useSelector(state => state.heroes);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: nominationData.step1
  });

  const onSubmit = (data) => {
    dispatch(saveStep1Data(data));
    onNext();
  };

  return (
    <div className="space-y-6">
      <div  className='text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600'> 
        <User className='mx-auto mb-2 h-12 w-12 text-white'/>
        </div>
       
        <h3 className="text-xl font-semibold mb-1">Basic Information</h3>
        <p className="text-gray-600 mb-6">Tell us about your hero</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="heroName" className="block text-sm font-medium text-gray-700 mb-2">
            Hero's Full Name *
          </label>
          <input
            id="heroName"
            type="text"
            {...register('heroName', { 
              required: 'Hero name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            placeholder="Enter the hero's full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.heroName && (
            <p className="text-red-500 text-sm mt-1">{errors.heroName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            id="location"
            type="text"
            {...register('location', { 
              required: 'Location is required',
              minLength: {
                value: 2,
                message: 'Location must be at least 2 characters'
              }
            })}
            placeholder="City, State or Neighborhood"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-800-700 transition-colors"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;