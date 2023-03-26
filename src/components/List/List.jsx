import React, { useRef, useState } from 'react';
import './List.scss';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { ListItem } from '../ListItem/ListItem';

export const List = ({ list }) => {
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setClickLimit]= useState(window.innerWidth / 230)

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosNewOutlinedIcon
          onClick={() => handleClick('left')}
          className="sliderArrow left"
          style={{ display: !isMoved && 'none'}}
        />
        <div className="container" ref={listRef}>
          {list.content?.map((item, index) => (
            <ListItem index={index} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          onClick={() => handleClick('right')}
          className="sliderArrow right"
        />
      </div>
    </div>
  );
};
