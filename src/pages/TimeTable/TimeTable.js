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

  // const [branchArr, setBranchArr] = useState();
  // const [screenArr, setScreenArr] = useState();
  // const [movieTimeArr, setMovieTimeArr] = useState();

  useEffect(() => {
    // 개발용 코드
    fetch('/data/movieTitle.json')
      .then(res => res.json())
      .then(data => {
        setTitleList(data.data); // 1. 제목 리스트 저장
        setCurrTitle(data.data[0]); // 1. 현제 제목 저장
      });

    // 통신용 코드
    // fetch('http://localhost:8000/booking')
    //   .then(res => res.json())
    //   .then(data => {
    //     const tempArr = [];
    //     data.data.map(elem => {
    //       if (elem.ko_title.length > 14) {
    //         let modifyElem = '';
    //         for (let i = 0; i < 10; i++) {
    //           modifyElem += elem.ko_title[i];
    //         }
    //         modifyElem += '...';
    //         tempArr.push(modifyElem);
    //       } else tempArr.push(elem.ko_title);
    //     });
    //     setTitleList(tempArr); // 1. 제목 리스트 저장
    //     setCurrTitle(tempArr[0]); // 1. 현제 제목 저장
    //   });
  }, []);

  useEffect(() => {
    setReqData({
      movie_title: currTitle,
      date: currDate,
      loc_name: currArea,
    });
  }, [currTitle, currDate, currArea]);

  useEffect(() => {
    console.log('reqDate', reqData);
    fetch('/data/movieInfo.json')
      .then(res => res.json())
      .then(data => {
        setResData(data.movieData);
      });

    //통신용 fetch
    // console.log(reqData);
    // fetch('http://localhost:8000/booking/movie-location', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json', // 헤더 없으면 에러남
    //   },
    //   // body: JSON.stringify(reqData),
    //   body: JSON.stringify({
    //     date: '2022-11-15',
    //     movie_title: '블랙 팬서: 와칸다 포에버',
    //     loc_name: '서울',
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(data => setResData(data);
    //   );
  }, [reqData]);

  useEffect(() => {
    console.log(resData);
    if (resData) setCurrPoster(resData[0].Img_url);
    if (resData) {
      const tempArr1 = [];
      resData.map(elem => {
        if (!tempArr1.includes(elem.cinema_name))
          tempArr1.push(elem.cinema_name);
      });

      if (tempArr1) {
        tempArr1.map(elem => {
          console.log(resData.filter(data => data.cinema_name === elem));
        });
      }
    }
  }, [resData]);

  return (
    <div className={css.mainDiv}>
      <SortByMovie
        titleList={titleList}
        setCurrTitle={setCurrTitle}
        currPoster={currPoster}
        setTitleList={setTitleList}
      />
      <TimeTableComponent
        currTitle={currTitle}
        currDate={currDate}
        setCurrDate={setCurrDate}
        currArea={currArea}
        setCurrArea={setCurrArea}
      />
    </div>
  );
}

export default App;
