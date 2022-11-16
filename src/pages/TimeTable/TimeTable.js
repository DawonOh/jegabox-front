import React, { useState, useEffect, useRef } from 'react';
import css from './timetable.module.scss';
import SortByMovie from '../../components/TimeTableComponent/SortByMovie';
import TimeTableComponent from '../../components/TimeTableComponent/TimeTableComponent';

function App() {
  const [titleList, setTitleList] = useState([]); // SortByMovie에 뿌릴 타이틀 정보

  const [currTitle, setCurrTitle] = useState();
  const date = new Date();
  const [currDate, setCurrDate] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  const [currArea, setCurrArea] = useState('서울');
  const [currPoster, setCurrPoster] = useState(); // 필터링 된 정보를 받아올 때 업데이트 할 수 있음

  const [reqData, setReqData] = useState(); // 요청 객체(필터링 키 정보)
  const [resData, setResData] = useState(); // 응답 객체(필터링 된 상영 정보)

  useEffect(() => {
    fetch('/data/movieTitle.json')
      .then(res => res.json())
      .then(data => {
        setTitleList(data.movieTitle); // 1. 제목 리스트 저장
        setCurrTitle(data.movieTitle[0]); // 1. 현제 제목 저장
      });
  }, []);

  useEffect(() => {
    setReqData({
      currTitle: currTitle,
      currDate: currDate,
      currArea: currArea,
    });
  }, [currTitle, currDate, currArea]);

  useEffect(() => {
    console.log('reqDate', reqData);
    fetch('/data/movieInfo.json')
      .then(res => res.json())
      .then(data => {
        console.log('data.movieData', data.movieData);
        setResData(data.movieData);
      });
  }, [reqData]);

  useEffect(() => {
    if (resData) setCurrPoster(resData[0].imgURL);
  }, [resData]);

  return (
    <div>
      <SortByMovie
        titleList={titleList}
        setCurrTitle={setCurrTitle}
        currPoster={currPoster}
        setTitleList={setTitleList}
      />
      <TimeTableComponent />
    </div>
  );
}

export default App;
