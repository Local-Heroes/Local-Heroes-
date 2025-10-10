import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchHeroById, 
  thankHero, 
  addComment, 
  fetchHeroComments ,
  deleteComment
} from '../store/slices/heroesSlice';
import { 
  MapPin, 
  Heart, 
  MessageCircle, 
  Calendar, 
  User, 
  ArrowLeft,
  Send,
  Trash2
} from 'lucide-react';

const ViewCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentHero, status } = useSelector(state => state.heroes);
  const { user } = useSelector(state => state.auth);
  const [newComment, setNewComment] = useState('');
  const [isThanking, setIsThanking] = useState(false);


//  const isUser = currentHero?.comments?.map(comment => comment.user._id = user?._id) // Temporary fix for comment user ID;

//  console.log(isUser); // Temporary debug log

  useEffect(() => {
    if (id) {
      dispatch(fetchHeroById(id));
      dispatch(fetchHeroComments(id));
    }
  }, [dispatch, id]);

  const handleDeleteComment = async (commentId) => {
    if (user && currentHero) {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
          await dispatch(deleteComment({ heroId: currentHero._id, commentId })).unwrap();
        } catch (error) {
          console.error('Delete comment failed:', error);
        }
      }
    }
  };

  const handleThank = async () => {
    if (user && currentHero && !currentHero.user_has_thanked) {
      setIsThanking(true);
      try {
        await dispatch(thankHero(currentHero._id)).unwrap();
      } catch (error) {
        console.error('Thank failed:', error);
      } finally {
        setIsThanking(false);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() && user && currentHero) {
      try {
        await dispatch(addComment({
          heroId: currentHero._id,
          text: newComment.trim()
        })).unwrap();
        setNewComment('');
      } catch (error) {
        console.error('Comment failed:', error);
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
          <p className="mt-4 text-gray-600">Loading hero details...</p>
        </div>
      </div>
    );
  }

  if (!currentHero) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Not Found</h2>
          <p className="text-gray-600 mb-4">The hero you're looking for doesn't exist.</p>
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Heroes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Heroes
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          {currentHero.photo_url && (
            <div className="relative h-80 w-full">
              <img
                src={currentHero.photo_url}
                alt={currentHero.full_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-br from-orange-400 to-purple-600 hidden"
                style={{ display: 'none' }}
              >
                <div className="flex items-center justify-center h-full text-white text-6xl">
                  👑
                </div>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {currentHero.full_name}
                </h1>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{currentHero.location}</span>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-lg font-semibold text-gray-900">
                    {currentHero.thanks_count || 0} Thanks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-900">
                    {currentHero.comments?.length || 0} Comments
                  </span>
                </div>
              </div>

              {/* Thank Button */}
              <button
                onClick={handleThank}
                disabled={!user || currentHero.user_has_thanked || isThanking}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  currentHero.user_has_thanked
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Heart className="w-5 h-5" fill={currentHero.user_has_thanked ? 'currentColor' : 'none'} />
                <span>
                  {isThanking ? 'Thanking...' : 
                   currentHero.user_has_thanked ? 'Thanked!' : 'Thank Hero'}
                </span>
              </button>
            </div>

            {/* Story Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Their Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {currentHero.story}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact Areas</h3>
              <div className="flex flex-wrap gap-2">
                {currentHero.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Nominated on {formatDate(currentHero.created_at)}
                  </span>
                </div>
                {currentHero.created_by && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Nominated by {currentHero.created_by.name || 'Anonymous'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Community Appreciation ({currentHero.comments?.length || 0})
                </h2>
              </div>

              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleAddComment} className="mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your appreciation and positive thoughts about this hero..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows="4"
                      maxLength="500"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-500">
                        {newComment.length}/500 characters
                      </span>
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="flex items-center space-x-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post Comment</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-center">
                    Please log in to leave a comment and show your appreciation.
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {currentHero.comments?.length > 0 ? (
                  currentHero.comments.map((comment) => (
                    <div key={comment.id || comment._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {comment.user?.name.charAt(0) || 'A'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {comment.user?.name || 'Anonymous'}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(comment.created_at)}
                            </p>
                          </div>
                        </div>
                        {user && comment.user?.id === user?._id && (
                          <button
                            onClick={() => {handleDeleteComment(comment.user?.id)}}
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {comment.text || comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No comments yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to share your appreciation for this hero!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;