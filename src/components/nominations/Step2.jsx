// components/Step2.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveStep2Data } from '../../store/slices/heroesSlice';
import { User,BookDashed } from "lucide-react"

const Step2 = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const { nominationData } = useSelector(state => state.heroes);
  const [tags, setTags] = useState(nominationData.step2?.impactTags || []);
  const [currentTag, setCurrentTag] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      shortDescription: nominationData.step2?.shortDescription || '',
      fullStory: nominationData.step2?.fullStory || '',
    }
  });

  const fullStory = watch('fullStory', '');

  const addTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        const newTags = [...tags, currentTag.trim()];
        setTags(newTags);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = (data) => {
    // Validate that at least one tag is provided
    if (tags.length === 0) {
      alert('Please add at least one tag');
      return;
    }

    const formData = {
      ...data,
      impactTags: tags
    };
    dispatch(saveStep2Data(formData));
    onNext();
  };

  return (
    <div className="space-y-6">
        <div  className='text-center'>
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600'> 
        <BookDashed className='mx-auto mb-2 h-12 w-12 text-white'/>
        </div>
       
        <h3 className="text-xl font-semibold mb-1">Their impact story</h3>
        <p className="text-gray-600 mb-6">share what make them a hero</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Short Description (Optional)
          </label>
          <div className="relative">
            <textarea
              id="shortDescription"
              {...register('shortDescription')}
              placeholder="A brief summary of their impact (e.g., 'Started a community garden feeding')"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
              maxLength={50}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {watch('shortDescription', '').length}/50
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="fullStory" className="block text-sm font-medium text-gray-700 mb-2">
            Full Impact Story *
          </label>
          <div className="relative">
            <textarea
              id="fullStory"
              {...register('fullStory', {
                required: 'Full story is required',
                minLength: {
                  value: 10,
                  message: 'Story must be at least 10 characters'
                }
              })}
              placeholder="Tell us the full story of their impact. What did they do? How has it helped the community? What makes them special?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {fullStory.length} characters (min 10)
            </div>
          </div>
          {errors.fullStory && (
            <p className="text-red-500 text-sm mt-1">{errors.fullStory.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impact Tags *
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={addTag}
              placeholder="Add tags (e.g., 'Community Garden', 'Volunteer') - Press Enter to add"
              className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-0"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {tags.length} tags added (at least one required)
          </p>
          {tags.length === 0 && (
            <p className="text-red-500 text-sm mt-1">Please add at least one tag</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={tags.length === 0}
            className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;