import React from 'react';
import css from './MainUnderBar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdLocalMovies } from 'react-icons/md';
import { IoTicketOutline } from 'react-icons/io5';
const MainUnderBar = () => {
  return (
    <div>
      <div className={css.mainUnderBarWhole}>
        <div className={`${css.boxes} ${css.searchBar}`}>
          <input placeholder="영화명을 입력해주세요"></input>

          <BiSearch className={css.searchIcon} />
        </div>
        <div className={css.boxes}>
          <IoCalendarOutline className={css.icon} />
          <span className={css.title}>상영시간표</span>
        </div>
        <div className={css.boxes}>
          <MdLocalMovies className={css.icon} />
          <span className={css.title}>박스오피스</span>
        </div>
        <div className={css.boxes}>
          <IoTicketOutline className={css.icon} />
          <span className={css.title}>빠른예매</span>
        </div>
      </div>
    </div>
  );
};

export default MainUnderBar;
