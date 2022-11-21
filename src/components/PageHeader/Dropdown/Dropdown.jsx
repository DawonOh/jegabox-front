import '../../../components/ResetSubin.scss';
import css from './Dropdown.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  return (
    <div className={css.dropdownContainer}>
      <div className={css.dropdownWhole}>
        <div className={css.testdiv}>
          <h5>SITEMAP</h5>
          <div className={css.dropdownSize}>
            <div className={css.dropdownTitle}>
              <div className={`${css.firstMap} ${css.heightChange}`}>
                <div className={css.heightChange}>
                  &nbsp; &nbsp;&nbsp;&nbsp;영화 &nbsp; &nbsp;&nbsp;&nbsp;
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    전체영화
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    큐레이션
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    영화제
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    무비포스트
                  </Link>
                </div>
                <div className={css.heightChange}>
                  예매
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    빠른예매
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    상영시간표
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    더 부티크 프라이빗 예매
                  </Link>
                </div>
                <div className={css.heightChange}>
                  &nbsp; &nbsp;&nbsp;&nbsp;극장&nbsp; &nbsp; &nbsp; &nbsp;
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    전체극장
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    특별관
                  </Link>
                </div>
                <div className={css.heightChange}>
                  이벤트
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    진행중 이벤트
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    지난 이벤트
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    당첨자발표
                  </Link>
                </div>
                <div className={css.heightChange}>
                  스토어
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    새로운 상품
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    메가티켓
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    팝콘/음료/굿즈
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    포인트몰
                  </Link>
                </div>
                <div>
                  나의 메가박스
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    나의 메가박스 홈
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    예매/구매내역
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    영화관람권
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    스토어교환권
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    할인/제휴쿠폰
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    멤버십포인트
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    나의 무비스토리
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    나의 이벤트 응모내역
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    나의 문의내역
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    자주쓰는 할인카드
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    회원정보
                  </Link>
                </div>
              </div>
              <div className={css.secondMap}>
                <div>
                  혜택
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    멤버십 안내
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    VIP LOUNGE
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    제휴/할인
                  </Link>
                </div>
                <div>
                  고객센터
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    고객센터 홈
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    자주묻는질문
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    공지사항
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    1:1문의
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    단체/대관문의
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    분실물문의
                  </Link>
                </div>
                <div>
                  회사소개
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    메가박스소개
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    사회공헌
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    홍보자료
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    제휴/부대사업문의
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    온라인제보센터
                  </Link>
                </div>
                <div>
                  이용정책
                  <Link
                    className={`${css.dropdownLink} ${css.borderline}`}
                    to={'/login'}
                  >
                    이용약관
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    위치기반서비스 이용약관
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    개인정보처리방침
                  </Link>
                  <Link className={css.dropdownLink} to={'/login'}>
                    스크린수배정에관한기준
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
