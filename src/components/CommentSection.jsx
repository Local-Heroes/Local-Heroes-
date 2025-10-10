import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment, fetchHeroComments } from '../store/slices/heroesSlice';

const CommentSection = ({ hero, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (hero && hero.id) {
      dispatch(fetchHeroComments(hero.id));
    }
  }, [dispatch, hero]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      dispatch(addComment({
        heroId: hero.id,
        text: newComment.trim() // Changed from 'comment' to 'text' to match API
      }));
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment({
        heroId: hero.id,
        commentId
      }));
    }
  };

  // Helper function to safely access comment properties
  const getCommentText = (comment) => {
    return comment.text || comment.content || '';
  };

  const getCommentAuthor = (comment) => {
    return comment.created_by?.name || comment.user_name || 'Anonymous';
  };

  const getCommentDate = (comment) => {
    return comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Unknown date';
  };

  const getCommentId = (comment) => {
    return comment.id || comment._id;
  };

  const canDeleteComment = (comment) => {
    return user && (comment.created_by?.id === user.id || comment.user_id === user.id);
  };

  return (
    <div className="border-t border-gray-200 p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Comments</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your appreciation and positive thoughts..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            maxLength="500"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {newComment.length}/500 characters
            </span>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="text-yellow-800">
            Please log in to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {hero.comments?.length > 0 ? (
          hero.comments.map((comment) => (
            <div key={getCommentId(comment)} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">
                    {getCommentAuthor(comment)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {getCommentDate(comment)}
                  </p>
                </div>
                {canDeleteComment(comment) && (
                  <button
                    onClick={() => handleDeleteComment(getCommentId(comment))}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {getCommentText(comment)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to share your appreciation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;