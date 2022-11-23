import React, { useState, useEffect, useRef } from 'react';
import css from './timetable.module.scss';
import SortByMovie from '../../components/TimeTableComponent/SortByMovie';
import TimeTableComponent from '../../components/TimeTableComponent/TimeTableComponent';
import ScreeningInfo from '../../components/TimeTableComponent/ScreeningInfo1';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/Footer/Footer';
import SelectSeat from '../SelectSeat/SelectSeat';
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
  const [runningTime, setRunningTime] = useState();

  const [placeArr, setPlaceArr] = useState();
  const [screenArr, setScreenArr] = useState();
  const [processedArr, setProcessedArr] = useState([]);

  const [posterTest, setPosterTest] = useState();
  const [posterList, setPosterList] = useState();

  const [movieTime, setMovieTime] = useState();

  useEffect(() => {
    // 개발용 코드
    // fetch('/data/movieTitle.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setTitleList(data.data); // 1. 제목 리스트 저장
    //     setCurrTitle(data.data[0]); // 1. 현제 제목 저장
    //   });

    // 통신용 코드
    fetch('http://localhost:8000/booking')
      .then(res => res.json())
      .then(data => {
        const tempArr = [];
        const tempArr2 = []; //포스터 리스트
        setPosterTest(data.data[0].movie_poster);

        for (let i = 0; i < data.data.length; i++) {
          tempArr2.push(data.data[i].movie_poster);
        }
        setPosterList(tempArr2);

        data.data.map(elem => {
          if (elem.ko_title.length > 14) {
            let modifyElem = '';
            for (let i = 0; i < 10; i++) {
              modifyElem += elem.ko_title[i];
            }
            modifyElem += '...';
            tempArr.push(modifyElem);
          } else tempArr.push(elem.ko_title);
        });
        setTitleList(tempArr); // 1. 제목 리스트 저장
        setCurrTitle(tempArr[0]); // 1. 현제 제목 저장
      });
  }, []);

  useEffect(() => {
    setReqData({
      movie_title: currTitle,
      date: currDate,
      loc_name: currArea,
    });
  }, [currTitle, currDate, currArea]);

  useEffect(() => {
    //개발용 코드
    console.log('reqDate', reqData);
    // fetch('/data/movieInfo.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setResData(data.movieData);
    //   });

    //통신용 fetch
    console.log(reqData);
    if (reqData) {
      if (reqData.movie_title && reqData.date && reqData.loc_name)
        fetch('http://localhost:8000/booking/movie-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // 헤더 없으면 에러남
          },
          body: JSON.stringify(reqData),
        })
          .then(res => res.json())
          .then(data => setResData(data));
    }
  }, [reqData]);

  useEffect(() => {
    console.log('resData', resData);
    // if (resData) setCurrPoster(resData[1].Img_url);
    if (resData) {
      const tempArr1 = []; //[강남, 강동, 마곡, 화곡]
      const tempArr2 = []; //[[강남 관별 상영 정보], [강동 관별 상영 정보], [마곡 관별 상영 정보], [화곡 관별 상영 정보]]
      const tempArr3 = [];
      const screenArr = []; // 스크린 별 상영 정보

      if (resData.length !== 0) setMovieTime(resData[0].movie_time);

      // 상영관 별 배열값 push
      // tempArr1 = [강남, 강동, 마곡, 화곡]
      resData.map(elem => {
        if (!tempArr1.includes(elem.cinema_name))
          tempArr1.push(elem.cinema_name);
      });

      // 상영관 별 전체 영화 정보 배열값 push
      // tempArr2 = [[{}, {}, {}, {}], [{}, {}], [{}], [{}]];
      tempArr1.map(elem => {
        tempArr2.push(resData.filter(data => data.cinema_name === elem));
      });

      // 지역별 상영 스크린 배열값 push
      // screenArr = [[1, 2, 3], [1, 2], [1], [1]];
      tempArr2.map(elem => {
        const temp2 = [];
        elem.map(elem2 => {
          if (!temp2.includes(elem2.screen)) temp2.push(elem2.screen);
        });
        screenArr.push(temp2);
      });

      // tempArr1 = [강남, 강동, 마곡, 화곡]
      // screenArr = [[1, 2, 3], [1, 2], [1], [1]];
      tempArr1.map((elem, idx) => {
        const temp = [];
        screenArr[idx].map(elem2 => {
          temp.push(
            resData.filter(
              elem3 => elem3.cinema_name === elem && elem3.screen === elem2
            )
          );
        });
        tempArr3.push(temp);
      });
      setProcessedArr(tempArr3);
      setPlaceArr(tempArr1);
      setScreenArr(screenArr);
      console.log('tempArr3', tempArr3);

      // 강남의 스크린별 상영 정보 배열, 강동의 스크린별 상영 정보 배열, 마곡의 스크린별 상영 정보 배열, 마곡의 스크린별 상영 정보 배열
      // screenArr.map(elem => {
      //   // elem는 강남의 스크린 배열
      //   const temp = [];
      //   elem.map(elem2 => {
      //     // elem2는 강남의 스크린 요소
      //     const temp2 = [];
      //     tempArr2.map(elem3 => {
      //       const temp3 = [];
      //       elem3.map(elem4 => {
      //         if (elem4.screen === elem2) temp3.push(elem4);
      //       });
      //       temp2.push(temp3);
      //     }); // elem3는 강남의 상영 정보 배열
      //     temp.push(temp2);
      //   });
      //   tempArr3.push(temp);
      // });
      // console.log(tempArr3);
    }
  }, [resData]);

  return (
    <>
      <PageHeader />
      <div className={css.mainDiv}>
        <SortByMovie
          titleList={titleList}
          setCurrTitle={setCurrTitle}
          currPoster={currPoster}
          setTitleList={setTitleList}
          posterTest={posterTest}
          setPosterTest={setPosterTest}
          posterList={posterList}
        />
        <TimeTableComponent
          currTitle={currTitle}
          currDate={currDate}
          setCurrDate={setCurrDate}
          currArea={currArea}
          setCurrArea={setCurrArea}
        />
        {processedArr.map((elem, idx) => {
          return (
            <ScreeningInfo
              processedArr={processedArr}
              key={idx}
              idx={idx}
              placeArr={placeArr}
              screenArr={screenArr}
            />
          );
        })}
      </div>

      <div className={css.ad}>
        <p>AD</p>
        <a href="http://54.180.151.218:3000/">
          <img src="/image/photo.png" alt="jsop" />
        </a>
        <h2>누구나 작가가 될 수 있다고 생각합니까? 될 수 있으니 각오해라</h2>
      </div>
      <PageFooter />
    </>
  );
}

export default App;
