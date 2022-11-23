import React from 'react';
import BookingInfo from '../../components/Mypage/BookingInfo';
import css from './MypageSidebar.module.scss';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  function moveMovieStory() {
    navigate('/mypage/moviestory');
  }

  return (
    <div className={css.cidebarMain}>
      <div className={css.titleDiv}>나의 메가박스</div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>예매/구매내역</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>영화/스토어 관람권</span>
      </div>
      <div className={css.whiteDiv}>
        <div className={css.whiteDivMargin}>
          <div className={css.whiteCell}>영화관람권</div>
          <div className={css.whiteCell}>스토어 관람권</div>
        </div>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>메가박스/제휴쿠폰</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>멤버쉽 포인트</span>
      </div>
      <div className={css.whiteDiv}>
        <div className={css.whiteDivMargin}>
          <div className={css.whiteCell}>포인트 이용내역</div>
          <div className={css.whiteCell}>멤버쉽 카드관리</div>
          <div className={css.whiteCell}>MiL.K포인트</div>
        </div>
      </div>
      <div className={css.middleDiv} onClick={moveMovieStory}>
        <span className={css.middleSpan}>나의 무비 스토리</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>나의 이벤트 응모내역</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>나의 문의내역</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>자주쓰는 카드 관리</span>
      </div>
      <div className={css.middleDiv}>
        <span className={css.middleSpan}>회원정보</span>
      </div>
      <div className={css.whiteDiv}>
        <div className={css.whiteDivMargin}>
          <div className={css.whiteCell}>개인정보 수정</div>
          <div className={css.whiteCell}>선택정보 수정</div>
        </div>
      </div>
    </div>
  );
}

export default App;
