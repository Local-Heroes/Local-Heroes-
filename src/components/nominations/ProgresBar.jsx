// components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 1: return '33%';
      case 2: return '67%';
      case 3: return '100%';
      default: return '0%';
    }
  };

  const getStepText = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Story Details';
      case 3: return 'Photo & Review';
      default: return '';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Step {currentStep} of 3</h2>
        <span className="text-sm text-gray-600">
          {getProgressPercentage()} Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
          style={{ width: getProgressPercentage() }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{getStepText()}</p>
    </div>
  );
};

export default ProgressBar;