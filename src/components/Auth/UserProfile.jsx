// components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, deleteHero } from '../../store/slices/heroesSlice';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Heart, 
  Trash2, 
  Edit3,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, userHeroes, status, error } = useSelector(state => state.heroes);
  const [deletingHeroId, setDeletingHeroId] = useState(null);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleDeleteHero = async (heroId) => {
    if (window.confirm('Are you sure you want to delete this hero? This action cannot be undone.')) {
      setDeletingHeroId(heroId);
      try {
        await dispatch(deleteHero(heroId)).unwrap();
        // Refresh user data to get updated heroes list
        dispatch(fetchCurrentUser());
      } catch (error) {
        console.error('Failed to delete hero:', error);
        alert('Failed to delete hero. Please try again.');
      } finally {
        setDeletingHeroId(null);
      }
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchCurrentUser())}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <Link 
            to="/login" 
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentUser.name}</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center lg:justify-start text-gray-600">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start text-gray-600">
                  <User className="w-5 h-5 mr-3" />
                  <span>Member since {formatDate(currentUser.created_at)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{userHeroes.length}</div>
                  <div className="text-sm text-orange-700">Heroes Created</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {userHeroes.reduce((total, hero) => total + (hero.thanks_count || 0), 0)}
                  </div>
                  <div className="text-sm text-purple-700">Total Thanks</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {userHeroes.filter(hero => (hero.thanks_count || 0) > 0).length}
                  </div>
                  <div className="text-sm text-green-700">Appreciated Heroes</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <Link
                to="/nominate"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Nominate New Hero</span>
              </Link>
            </div>
          </div>
        </div>

        {/* My Heroes Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              My Hero Nominations ({userHeroes.length})
            </h2>
            
            {userHeroes.length === 0 && (
              <Link
                to="/nominate"
                className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Hero</span>
              </Link>
            )}
          </div>

          {/* Heroes Grid */}
          {userHeroes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userHeroes.map((hero) => (
                <div key={hero.id || hero._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                  {/* Hero Image */}
                  {hero.photo_url && (
                    <div className="relative h-48 w-full">
                      <img
                        src={hero.photo_url}
                        alt={hero.full_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 hidden items-center justify-center text-white text-4xl"
                        style={{ display: 'none' }}
                      >
                        👑
                      </div>
                      
                      {/* Thanks Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                        <span>{hero.thanks_count || 0}</span>
                      </div>
                    </div>
                  )}

                  {/* Hero Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {hero.full_name}
                      </h3>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{hero.location}</span>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {hero.story}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hero.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {hero.tags?.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            +{hero.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Creation Date */}
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Created {formatDate(hero.created_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                      <Link
                        to={`/hero/${hero.id || hero._id}`}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>View Details</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteHero(hero.id || hero._id)}
                        disabled={deletingHeroId === (hero.id || hero._id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>
                          {deletingHeroId === (hero.id || hero._id) ? 'Deleting...' : 'Delete'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Heroes Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't nominated any heroes yet. Start making a difference in your community by nominating someone who deserves recognition!
                </p>
                <Link
                  to="/nominate"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Nominate Your First Hero</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;