import React, { useState } from 'react';
import axios from 'axios';

const Picture = ({ picture }) => {
  const [likes, setLikes] = useState(picture.likes || 0);
  const [tags, setTags] = useState(picture.tags || []);
  const [followersCount, setFollowersCount] = useState(picture.followers.length);
  const [isFollowing, setIsFollowing] = useState(picture.followers.includes('60a3b6b5f3f4d3b3b8b9b1b1'));
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/pictures/${picture._id}/like`);
      setLikes(response.data.likes);
      setMessage('Liked the picture!');
    } catch (error) {
      console.error("Error liking picture:", error);
      setMessage('Error liking the picture.');
    } finally {
      setLoading(false);
    }
  };

  const handleTag = async () => {
    if (!newTag) return;
    setLoading(true);
    try {
      const response = await axios.post(`/api/pictures/${picture._id}/tag`, { tag: newTag });
      setTags(response.data.tags);
      setNewTag('');
      setMessage('Tag added successfully!');
    } catch (error) {
      console.error("Error adding tag:", error);
      setMessage('Error adding tag.');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setLoading(true);
    try {
      const response = isFollowing 
        ? await axios.post(`/api/pictures/${picture._id}/unfollow`) 
        : await axios.post(`/api/pictures/${picture._id}/follow`);
      setFollowersCount(response.data.followersCount);
      setIsFollowing(!isFollowing);
      setMessage(isFollowing ? 'Unfollowed!' : 'Followed!');
    } catch (error) {
      console.error("Error following/unfollowing:", error);
      setMessage('Error updating follow status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <img src={picture.url} alt="pic" className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{picture.title || 'Picture Title'}</h2>
        <p className="text-gray-600 mt-1">{picture.description || 'Picture description goes here.'}</p>
        <div className="flex justify-between mt-4">
          <button 
            onClick={handleLike} 
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-200 hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Liking...' : `Like (${likes})`}
          </button>
          <div className="flex items-center">
            <input 
              type="text" 
              value={newTag} 
              onChange={(e) => setNewTag(e.target.value)} 
              placeholder="Add a tag" 
              className="border border-gray-300 rounded py-2 px-3 w-36"
            />
            <button 
              onClick={handleTag} 
              className={`ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-200 hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-2 italic">Tags: {tags.length > 0 ? tags.join(', ') : 'No tags yet'}</div>
        <button 
          onClick={handleFollow} 
          className={`bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mt-2 focus:outline-none transition duration-200 hover:bg-gray-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : (isFollowing ? 'Unfollow' : 'Follow')}
        </button>
        {message && <div className="mt-4 text-green-500 font-semibold">{message}</div>}
      </div>
    </div>
  );
};

export default Picture;
