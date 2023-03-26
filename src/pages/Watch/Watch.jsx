import React, { useState, useEffect } from 'react';
import './Watch.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export const Watch = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get('/movies/find/' + path, {
        headers: {
          token: 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setMovie(response.data);
    }
    fetchMovie();
  }, [path]);

  return (
    <div className="watch">
      <div className="back">
        <ArrowBackIcon />
        <Link to='/' className='link'>Home</Link>{" "} {movie?.title}
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie?.video}
      />
    </div>
  );
};
