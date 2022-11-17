import React, { useState, useEffect } from 'react';
import css from './Booking.module.scss';
import DayBtn from '../../components/DayBtn/DayBtn';
import SelectSeat from '../SelectSeat/SelectSeat';
function Booking() {
  let now = new Date();
  let year = now.getFullYear(); //year
  let todayMonth = now.getMonth() + 1; //month
  let week = new Array('월', '화', '수', '목', '금', '토', '일');
  let date = now.getDate(); //날짜
  let day = now.getDay(); //요일
  const [num, setnum] = useState(0);
  const [disable, setDisable] = useState(true);
  const [movies, setMovie] = useState([]);
  const [movieId, setId] = useState();
  const [locations, setLocation] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [cinemas, setCinema] = useState([]);
  const [cinemaId, setCinemaId] = useState();
  const printDayBtn = num => {
    const result = [];
    for (let i = 0; i < 14; i++) {
      result.push(
        <DayBtn
          key={i}
          date={now.setDate(date + i + num)}
          week={week[day + (i % 7) - day]}
          today={date}
        />
      );
    }
    return result;
  };

  useEffect(() => {
    fetch('/data/movie.json')
      .then(res => res.json())
      .then(res => setMovie(res.movie));

    fetch('/data/cinema.json')
      .then(res => res.json())
      .then(res => setCinema(res.cinema));

    fetch('/data/location.json')
      .then(res => res.json())
      .then(res => setLocation(res.location));
  }, []);

  useEffect(() => {
    prtMovie(); //영화 선택시, 밑에 영화 포스터 뜨게 하기 => 최대 3개까지 인거 생각하고 다시ㅏ찍
  }, [movieId]);

  useEffect(() => {
    prtCinema(); //유저가 로케이션 클릭시 해당지역 영화관 뜨게 하기.
  }, [locationId]);

  const prtMovie = () => {
    const selectMovie = movies.filter(movie => movie.id === movieId);
    let url = selectMovie[0] || {};
    url = url.movie_poster;
    return <p>{url}</p>;
  };

  const prtCinema = () => {
    let result = [];
    const selectCinema = cinemas.filter(
      cinemas => cinemas.location_id === locationId
    );
    selectCinema.map((cinema, idx) => {
      result.push(
        <p key={idx} onClick={() => setCinemaId(cinema.id)}>
          {cinema.cinema_name}
        </p>
      );
    });
    return result;
  };

  const printTimeBtn = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(
        <button key={i}>
          {0}
          {i}
        </button>
      );
    }
    return result;
  };

  return (
    <div className={css.container}>
      <div className={css.innerWrap}>
        <h2>빠른 예매</h2>
        {disable && (
          <div className={css.bookTable}>
            <div className={css.timeSchedule}>
              <div className={css.year}>
                <p>
                  {year}.{todayMonth}
                </p>
              </div>
              <button onClick={() => setnum(num - 1)} disabled={disable}>
                {' '}
                <img
                  src="image/left-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              {printDayBtn(num)}
              <button onClick={() => setnum(num + 1)}>
                {' '}
                <img
                  src="image/right-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              <div className={css.cal}>
                <img src="image/cal.png" alt="cal" />
              </div>
            </div>
            <div className={css.choiceArea}>
              <div className={css.movieChoice}>
                <p>영화</p>
                <div className={css.m_listArea}>
                  <p>전체</p>
                  <div className={css.m_list}>
                    {movies.map((movie, idx) => (
                      <p
                        key={idx}
                        onClick={() => {
                          setId(movie.id);
                        }}
                      >
                        {movie.ko_title}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={css.selectedMovie}>{prtMovie()}</div>
              </div>
              <div className={css.theaterChoice}>
                <p>극장</p>
                <div className={css.t_listArea}>
                  <p>전체</p>
                  <div className={css.t_list}>
                    <div className={css.location}>
                      {locations.map((location, idx) => (
                        <p
                          key={idx}
                          onClick={() => {
                            setLocationId(location.id);
                          }}
                        >
                          {location.location_name}
                        </p>
                      ))}
                    </div>
                    <div className={css.cinema}>{prtCinema()}</div>
                  </div>
                </div>
                <div className={css.selectedTheater}></div>
              </div>
              <div className={css.timeChoice}>
                <p>시간</p>
                <div className={css.h_listArea}>
                  {' '}
                  <button>
                    {' '}
                    <img
                      src="image/left-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                  {printTimeBtn()}
                  <button>
                    {' '}
                    <img
                      src="image/right-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={css.ad}>광고</div>
          </div>
        )}
        {!disable && <SelectSeat />}
      </div>
    </div>
  );
}

export default Booking;
