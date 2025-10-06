// components/NominationForm.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNominationData, resetSubmissionStatus } from '../store/slices/heroesSlice';
import ProgressBar from '../components/nominations/ProgresBar';
import Step1 from '../components/nominations/Step1';
import Step2 from '../components/nominations/Step2';
import Step3 from '../components/nominations/Step3';
import { Sparkles } from 'lucide-react';

const NominationForm = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = React.useState(1);
  const { status } = useSelector(state => state.heroes);

  useEffect(() => {
    // Reset form when component unmounts
    return () => {
      dispatch(clearNominationData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      // Reset form after successful submission
      const timer = setTimeout(() => {
        dispatch(resetSubmissionStatus());
        setCurrentStep(1);
        dispatch(clearNominationData());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <Step3 onPrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-center">
          <p className="flex items-center font-bold text-amber-800
                         bg-orange-50 px-3 py-2
                         rounded-lg text-sm md:text-base">
            <Sparkles className="w-4 h-4 mr-2" />
            Celebrating Community Impact
          </p>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nominate a Local Hero
          </h1>
          <p className="text-gray-600">
            Help us celebrate someone making a positive impact in your community.
          </p>
          <p className="text-gray-600">
            Every hero deserves recognition.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <ProgressBar currentStep={currentStep} />
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default NominationForm;