import React, { useState, useEffect } from 'react';
import css from './timeTableComponent.module.scss';
import AreaFilter from './FilterAreaComponent';
import Daylist from './FilterDayComponent';

function App({ currTitle, currDate, setCurrDate, currArea, setCurrArea }) {
  const [areaClickCheck, setAreaClickCheck] = useState(1);
  const [dayClickCheck, setDayClickCheck] = useState(0);
  const [dateArr, setDateArr] = useState([]);
  const [dayOfWeekArr, setDayOfWeekArr] = useState([]);

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = parseInt(date.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  function makeDateArr() {
    const tempArr = [];
    const lastDay = new Date(year, month + 1, 0);
    const lastDay2 = lastDay.getDate();
    for (let i = day; i < 14 + day; i++) {
      if (i > lastDay2) tempArr.push(i - lastDay2);
      if (i <= lastDay2) tempArr.push(i);
    }

    const tempArr2 = [];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr2.push(
        week[new Date(`${year}-${month + 1}-${tempArr[i]}`).getDay()]
      );
    }

    setDateArr(tempArr);
    setDayOfWeekArr(tempArr2);
  }

  useEffect(() => {
    makeDateArr();
  }, []);

  return (
    <div className={css.mainDiv}>
      <div className={css.movieTitle}>
        <span style={{ fontSize: '25px', color: 'rgb(54, 121, 145)' }}>
          {currTitle}
        </span>
        <span
          style={{
            fontSize: '25px',
            color: 'rgb(77, 52, 145)',
            margin: '0 5px',
          }}
        >
          상영시간표
        </span>
      </div>
      <div className={css.scheduler}>
        <div className={css.sideBtn}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        {dateArr.map((elem, idx) => {
          return (
            <Daylist
              key={idx}
              elem={elem}
              idx={idx}
              day={day}
              dayOfWeekArr={dayOfWeekArr}
              setDayClickCheck={setDayClickCheck}
              dayClickCheck={dayClickCheck}
              currDate={currDate}
              setCurrDate={setCurrDate}
              year={year}
              month={month}
            />
          );
        })}
        <div className={css.sideBtn}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className={css.eventInfo}>
        <div className={css.eventDiv}>
          <div className={css.event}>🍥 무대인사</div>
          <div className={css.event}>🧁 회원시사</div>
          <div className={css.event}>🍰 오픈시사</div>
          <div className={css.event}>🎂 굿즈패키지</div>
          <div className={css.event}>🍭 싱어롱</div>
          <div className={css.event}>🥟 GV</div>
          <div className={css.event}>🍻 조조</div>
          <div className={css.event}>🌰 브런치</div>
          <div className={css.event}>🍡 심야</div>
        </div>
        <div className={css.classInfo}>관람등급안내</div>
      </div>
      <div className={css.areaFilterDiv}>
        <AreaFilter
          curr={1}
          name={'서울'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={2}
          name={'경기'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={3}
          name={'인천'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={4}
          name={'대전/충청/세종'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={5}
          name={'부산/대구/경상'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={6}
          name={'광주/전라'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <AreaFilter
          curr={7}
          name={'강원'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
      </div>
      <div className={css.hourlyMovie}></div>
    </div>
  );
}

export default App;
