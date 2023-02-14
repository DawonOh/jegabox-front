import React from 'react';
import css from './UnderMenu.module.scss';
import { useNavigate } from 'react-router-dom';
const UnderMenu = props => {
  const navigate = useNavigate();

  const goBooking = e => {
    if (e.target.innerHTML === '빠른예매') navigate('/booking');
    if (e.target.innerHTML === '전체영화') navigate('/movie');
    if (e.target.innerHTML === '상영시간표') navigate('/timetable');
  };
  return (
    <div className={css.undermenu}>
      <span onClick={e => goBooking(e)} style={{ marginLeft: props.margin }}>
        {props.menu1}
      </span>
      <span onClick={e => goBooking(e)}>{props.menu2}</span>
      <span>{props.menu3}</span>
    </div>
  );
};

export default UnderMenu;
