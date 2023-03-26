import React, { useEffect, useState } from 'react';
import './Featured.scss';
import cover from '../../images/stranger.webp';
import mat from '../../images/mat.jpg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';

export const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      const res = await axios.get(`/movies/random?type=${type}`, {
        headers: {
          token: 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setContent(res.data[0]);
    };
    fetchContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movies' ? 'Movies' : 'TV Series'}</span>
          <select name="genre" id="genre" onChange={e=> setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="cover" />
      <div className="info">
        <h2>{content.title}</h2>
        <span className="desc">{content.description}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};
