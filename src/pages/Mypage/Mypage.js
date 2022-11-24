import React, { useEffect, useState } from 'react';
import BookingInfo from '../../components/Mypage/BookingInfo';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import BookingCancle from '../../components/Mypage/BookingCancel';
import css from './mypage.module.scss';

function App() {
  const [bookingList, setBookingList] = useState([]);
  const [cancelList, setCancelList] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/mypage/bookinglist', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setBookingList(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/mypage/cancellist', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setCancelList(data);
      });
  }, []);

  return (
    <div className={css.mainDiv}>
      <MypageSidebar />
      <div className={css.rightArea}>
        <BookingInfo bookingList={bookingList} />
        <BookingCancle cancelList={cancelList} />
      </div>
    </div>
  );
}

export default App;
