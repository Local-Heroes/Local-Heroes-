import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thankHero } from '../store/slices/heroesSlice';
import { ToastContainer, toast } from 'react-toastify';
import { LocationEdit, Heart } from "lucide-react"
import { Link } from 'react-router-dom';

const HeroCard = ({ hero }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isThanking, setIsThanking] = useState(false);
  const [userHasThanked, setUserHasThanked] = useState("");



useEffect(() => {
  if (userHasThanked) {
    console.log("User has thanked (updated):", userHasThanked);
  }
}, [userHasThanked]);



  const [showFullStory, setShowFullStory] = useState(false);

  const handleThank = async () => {
    if (user && hero ) {
      setIsThanking(true);
      try {
      const response =  await dispatch(thankHero(hero._id)).unwrap();
     const id = response.data.userId;
      setUserHasThanked(id);
      console.log('User has thanked:', userHasThanked);
    
      } catch (error) {
        console.error('Thank failed:', error.error);
        toast.error(error.error || "Thank failed");
      } finally {
        setIsThanking(false);
      }
    }else{
      alert("Please login to thank the hero")
    }
  };

  const shortDescription = hero.story.length > 100 && !showFullStory
    ? `${hero.story.substring(0, 100)}...`
    : hero.story;

  const displayTags = hero.tags.slice(0, 2);
  const additionalTagsCount = hero.tags.length - 2;

  // Use thanks_count instead of thanks to match API
  const thanksCount = hero.thanks_count || hero.thanks || 0;

  const isThankedByUser = userHasThanked === user?._id;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <ToastContainer />
      {/* Top Image */}
      {hero.photo_url && (
        <div className="relative h-48 w-full">
          <img
            src={hero.photo_url}
            alt={hero.full_name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Category Badge (Top-left) */}
          {hero.tags?.length > 0 && (
            <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
              {hero.tags[0]}
            </div>
          )}
          {/* Likes Badge (Top-right) */}
          <div className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow flex items-center gap-1">
            <span>❤️</span>
            <span>{thanksCount || 0}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name & Location */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {hero.full_name}
        </h3>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <LocationEdit className="w-4 h-4 text-gray-400" />
          {hero.location}
        </p>

        {/* Story */}
        <p className="text-gray-700 text-sm mb-4 flex-1">
          {shortDescription}
          {hero.story.length > 100 && (
            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="text-orange-600 hover:text-orange-800 ml-1 text-sm font-medium"
            >
              {showFullStory ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayTags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {additionalTagsCount > 0 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
              +{additionalTagsCount} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-2">

          {/* thank */}
      <button
  onClick={handleThank}
    disabled={!user || isThanking || isThankedByUser}
  className={`flex items-center space-x-2 px-3 py-1 rounded-full font-semibold transition-all 
    ${userHasThanked === user?._id
      ? 'bg-green-100 text-green-700 cursor-default'
      : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
    } 
    disabled:opacity-50 disabled:cursor-not-allowed`}
>
  <Heart
    className="w-5 h-5"
    fill={isThankedByUser? 'currentColor' : 'none'}
  />
  <span>
    {isThanking ? 'Thanking...' :
     isThankedByUser ? 'Thanked!' : 'Thank Hero'}
  </span>
</button>



          {/* comment */}

          <Link to={`/hero/${hero._id}`}>
            <button
              className="text-blue-600 hover:text-blue-800 font-medium text-sm cursor-pointer"
            >
              Comments
            </button>
          </Link>


          {/* description */}
          <Link to={`/hero/${hero._id}`}>


            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="text-orange-600 hover:text-orange-800 font-medium text-sm cursor-pointer"
            >
              Read Story →
            </button>

          </Link>


        </div>
      </div>
    </div>

  );
};

export default HeroCard;