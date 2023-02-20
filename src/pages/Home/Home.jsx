import React, { useEffect, useState } from 'react';
import { Featured } from '../../components/Featured/Featured';
import { Navbar } from '../../components/Navbar/Navbar';
import { List } from '../../components/List/List';
import './Home.scss';
import axios from 'axios';

export const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenres] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWJiZjkyNDE5OWFjMzQ1Mzg2OWUxNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjY1NTk0OCwiZXhwIjoxNjc3MDg3OTQ4fQ._XllmZJBeco3k4m3q8jYnQVATz_DZuaAfJHBqYtdw5g',
            },
          }
        );
        //console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [genre, type]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};
