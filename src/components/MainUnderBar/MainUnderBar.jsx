import React from 'react';
import css from './MainUnderBar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';
import { IoTicketOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const MainUnderBar = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const getValue = e => {
    setContent(e.target.value);
  };
  const gotomovie = e => {
    if (content == '') {
      navigate('/movie');
    } else {
      let url = '/movie?searchText=' + content;
      navigate(url);
      window.location.reload();
    }
  };
  return (
    <div>
      <div className={css.mainUnderBarWhole}>
        <div className={`${css.boxes} ${css.searchBar}`}>
          <input
            onChange={getValue}
            type="text"
            placeholder="영화명을 입력해주세요"
          ></input>

          <BiSearch className={css.searchIcon} onClick={gotomovie} />
        </div>
        <div className={css.boxes}>
          <IoCalendarOutline className={css.icon} />
          <span className={css.title} onClick={() => navigate('/timetable')}>
            상영시간표
          </span>
        </div>
        <div className={css.boxes}>
          <MdLocalMovies className={css.icon} />
          <span className={css.title}>박스오피스</span>
        </div>
        <div className={css.boxes}>
          <IoTicketOutline className={css.icon} />
          <span className={css.title} onClick={() => navigate('/booking')}>
            빠른예매
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainUnderBar;
