import React from 'react';
import BookingInfo from '../../components/Mypage/BookingInfo';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import BookingCancle from '../../components/Mypage/BookingCancel';
import css from './mypage.module.scss';

function App() {
  return (
    <div className={css.mainDiv}>
      <MypageSidebar />
      <div className={css.rightArea}>
        <BookingInfo />
        <BookingCancle />
      </div>
    </div>
  );
}

export default App;
