import React, { useState, useEffect } from 'react';
import css from './timeTableComponent.module.scss';
import Area from './areaComponent';

function App({ currTitle, currDate, setCurrDate, currArea, setCurrArea }) {
  const [areaClickCheck, setAreaClickCheck] = useState();
  const [dayClickCheck, setDayClickCheck] = useState();
  const [dateArr, setDateArr] = useState([]);

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = parseInt(date.getDate());
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(`${year}-${month + 1}-${day}`).getDay()];

  function makeDateArr() {
    const tempArr = [];
    const lastDay = new Date(year, month + 1, 0);
    for (let i = day; i < 14 + day; i++) {
      if (i > lastDay) tempArr.push(i - lastDay);
      if (i <= lastDay) tempArr.push(i);
    }

    setDateArr(tempArr);
  }

  function dayClick(event) {
    const day = event.target.innerText;
    setCurrDate(`${year}-${month + 1}-${day}`);
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
            <div key={idx} className={css.day} onClick={dayClick}>
              <div>{elem}</div>
              <div>{dayOfWeek[idx]}</div>
            </div>
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
        <Area
          curr={1}
          name={'서울'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
          curr={2}
          name={'경기'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
          curr={3}
          name={'인천'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
          curr={4}
          name={'대전/충청/세종'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
          curr={5}
          name={'부산/대구/경상'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
          curr={6}
          name={'광주/전라'}
          setAreaClickCheck={setAreaClickCheck}
          areaClickCheck={areaClickCheck}
          setCurrArea={setCurrArea}
        />
        <Area
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
