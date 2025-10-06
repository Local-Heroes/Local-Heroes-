// components/Step3.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitNomination, saveStep3Data } from '../../store/slices/heroesSlice';
import {  ImagePlayIcon } from "lucide-react"

const Step3 = ({ onPrevious }) => {
  const dispatch = useDispatch();
  const { nominationData, status, error } = useSelector(state => state.heroes);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      photoUrl: nominationData.step3?.photoUrl || ''
    }
  });

  const onSubmit = (data) => {
    // Combine all step data and transform for API
    const combinedData = {
      ...nominationData.step1,
      ...nominationData.step2,
      ...data
    };

    dispatch(saveStep3Data(data));
    dispatch(submitNomination(combinedData));
  };

  return (
    <div className="space-y-6">
       <div  className='text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600'> 
        <ImagePlayIcon className='mx-auto mb-2 h-12 w-12 text-white'/>
        </div>
       
        <h3 className="text-xl font-semibold mb-1">Photo and Review</h3>
        <p className="text-gray-600 mb-6 capitalize">add photo and review your infotmation</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Hero Photo URL (Optional)
          </label>
          <input
            id="photoUrl"
            type="url"
            {...register('photoUrl', {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: 'Please enter a valid URL'
              }
            })}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.photoUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.photoUrl.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            A photo helps bring your hero's story to life. Please provide a direct image URL.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Review Your Nomination</h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <span className="font-medium">Full Name:</span> {nominationData.step1?.heroName}
            </div>
            <div>
              <span className="font-medium">Location:</span> {nominationData.step1?.location}
            </div>
            <div>
              <span className="font-medium">Short Description:</span> {nominationData.step2?.shortDescription || 'Not provided'}
            </div>
            <div>
              <span className="font-medium">Story:</span> 
              <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                {nominationData.step2?.fullStory}
              </p>
            </div>
            <div>
              <span className="font-medium">Tags:</span> 
              <div className="flex flex-wrap gap-1 mt-1">
                {nominationData.step2?.impactTags?.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {nominationData.step3?.photoUrl && (
              <div>
                <span className="font-medium">Photo URL:</span> 
                <p className="text-blue-600 break-all">{nominationData.step3.photoUrl}</p>
              </div>
            )}
          </div>
        </div>

        {/* Submission Status */}
        {status === 'loading' && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-blue-700">Submitting your nomination...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">
              Error: {error?.message || error || 'Failed to submit nomination'}
            </p>
            {error?.details && (
              <ul className="mt-2 list-disc list-inside">
                {Object.entries(error.details).map(([field, message]) => (
                  <li key={field}>{field}: {message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {status === 'succeeded' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-700">Nomination submitted successfully!</p>
            <p className="text-green-600 text-sm mt-1">
              Thank you for nominating a local hero. Your submission is being reviewed.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrevious}
            disabled={status === 'loading'}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={status === 'loading' || status === 'succeeded'}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Nomination'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;