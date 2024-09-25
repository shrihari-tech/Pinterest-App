import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Picture from './Picture';

const Feed = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const res = await axios.get('/api/pictures');
        if (Array.isArray(res.data)) {
          setPictures(res.data);
        } else {
          console.error('API did not return an array:', res.data);
          setPictures([]);
        }
      } catch (error) {
        console.error('Error fetching pictures:', error);
        setPictures([]);
      }
    };
    fetchPictures();
  }, []);
  

  return (
    <div>
      {pictures.length > 0 ? (
        pictures.map((picture) => <Picture key={picture._id} picture={picture} />)
      ) : (
        <p>No pictures found or loading...</p>
      )}
    </div>
  );
  
};

export default Feed;
