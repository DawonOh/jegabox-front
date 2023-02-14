import React, { useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { FaCalendarAlt } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../../components/ResetSubin.scss';
import css from './Header.module.scss';
import { Link } from 'react-router-dom';
import mainImg from '../../img/jegabox.jpg';
import Dropdown from './Dropdown/Dropdown';
import { useState } from 'react';
import GlassDropdown from './GlassDropDown/GlassDropdown';
import UnderMenu from './UnderMenu/UnderMenu';
import NonMember from './NonMember/NonMember';
import { Member } from './Member/Member';
import LoginModal from '../../components/Login/LoginModal';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [validToken, setValidToken] = useState(false);

  const navigate = useNavigate();
  const [validSearch, setValidSearch] = useState(false);
  const [validMenu, setValidMenu] = useState(false);

  const [validUnderMenu1, setValidUnderMenu1] = useState(false);
  const [validUnderMenu2, setValidUnderMenu2] = useState(false);
  const [validUnderMenu3, setValidUnderMenu3] = useState(false);
  const [validUnderMenu4, setValidUnderMenu4] = useState(false);
  const [validUnderMenu5, setValidUnderMenu5] = useState(false);

  const [validLogin, setValidLogin] = useState('');

  const clickJoin = () => {
    navigate('/join');
  };
  const [ValidMember, setValidMember] = useState(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  // 모달창 여는 함수
  const openLogin = () => {
    setOpenLoginModal(true);
  };
  // 모달창 닫는 함수
  const closeLogin = () => {
    setOpenLoginModal(false);
  };
  function showUnderMenu1() {
    setValidUnderMenu1(true);
  }
  function closeUnderMenu1() {
    setValidUnderMenu1(false);
  }
  function showUnderMenu2() {
    setValidUnderMenu2(true);
  }
  function closeUnderMenu2() {
    setValidUnderMenu2(false);
  }
  function showUnderMenu3() {
    setValidUnderMenu3(true);
  }
  function closeUnderMenu3() {
    setValidUnderMenu3(false);
  }
  function showUnderMenu4() {
    setValidUnderMenu4(true);
  }
  function closeUnderMenu4() {
    setValidUnderMenu4(false);
  }
  function showUnderMenu5() {
    setValidUnderMenu5(true);
  }
  function closeUnderMenu5() {
    setValidUnderMenu5(false);
  }
  function searchShow() {
    setValidMember(false);
    setValidMenu(false);
    setValidSearch(true);
  }
  function searchClose() {
    setValidSearch(false);
  }

  function menuSHow() {
    setValidMember(false);
    setValidMenu(true);
    setValidSearch(false);
  }
  function menuClose() {
    setValidMenu(false);
  }
  function memberShow() {
    setValidMember(true);
    setValidSearch(false);
    setValidMenu(false);
    if (getToken !== null) {
      setValidToken(true);
    } else {
      setValidToken(false);
    }
  }
  function memberClose() {
    setValidMember(false);
  }
  const getToken = window.localStorage.getItem('token');
  // const successLogin = () => {
  //   if (getToken !== null) {
  //     setValidLogin('로그아웃');
  //   } else {
  //     setValidLogin('로그인');
  //   }
  // };
  useEffect(() => {
    if (getToken !== null) {
      setValidLogin('로그아웃');
    } else {
      setValidLogin('로그인');
    }
  }, []);

  const Logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <div className={css.headerContainer}>
        <div className={css.header}>
          <div className={css.subNavbar}>
            <div className={css.memberBar}>
              <span>VIP LOUNGE</span>
              <span>멤버십</span>
              <span>고객센터</span>
            </div>
            <div className={css.memberBar}>
              {
                <span onClick={validLogin == '로그인' ? openLogin : Logout}>
                  {validLogin}
                </span>
              }
              {openLoginModal && <LoginModal closeLogin={closeLogin} />}
              <span onClick={clickJoin}>회원가입</span>
              <span>빠른예매</span>
            </div>
          </div>
          <ul className={css.mainWholeBar}>
            <li className={css.mainMenuBar}>
              <div className={css.divdiv}>
                <span className={`${css.linkToWhere}`} to={'/login'}>
                  {validMenu ? (
                    <AiFillCloseCircle
                      className={`${css.headIcon} ${css.closeIcon}`}
                      onClick={menuClose}
                    />
                  ) : (
                    <FiMenu className={css.headerIcon} onClick={menuSHow} />
                  )}
                </span>

                <span
                  className={`${css.linkToWhere} ${css.menuMargin1}`}
                  to={'/login'}
                >
                  {validSearch ? (
                    <AiFillCloseCircle
                      className={`${css.headIcon} ${css.closeIcon}`}
                      onClick={searchClose}
                    />
                  ) : (
                    <BiSearch className={css.headerIcon} onClick={searchShow} />
                  )}
                </span>
              </div>
            </li>
            <div className={css.mainMenuBarColumn}>
              <li className={css.mainMenuBar}>
                <div
                  className={css.save}
                  onMouseOver={showUnderMenu1}
                  onMouseOut={closeUnderMenu1}
                >
                  <Link
                    style={{
                      borderBottom: validUnderMenu1
                        ? '2px solid white'
                        : 'none',
                    }}
                    className={`${css.linkToWhere} ${css.menuMargin2}`}
                    to={'/movie'}
                  >
                    영화
                  </Link>
                  {validUnderMenu1 ? (
                    <UnderMenu
                      margin={'280px'}
                      menu1={'전체영화'}
                      menu2={'큐레이션'}
                      menu3={'무비포스트'}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </li>
              <li className={css.mainMenuBar}>
                <div onMouseOver={showUnderMenu2} onMouseOut={closeUnderMenu2}>
                  <Link
                    className={`${css.linkToWhere} ${css.menuMargin2}`}
                    to={'/booking'}
                    style={{
                      borderBottom: validUnderMenu2
                        ? '2px solid white'
                        : 'none',
                    }}
                  >
                    예매
                  </Link>
                  {validUnderMenu2 ? (
                    <UnderMenu
                      margin={'360px'}
                      menu1={'빠른예매'}
                      menu2={'상영시간표'}
                      menu3={'더 부티크 프라이빗 예매'}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </li>
              <li className={css.mainMenuBar}>
                <div onMouseOver={showUnderMenu3} onMouseOut={closeUnderMenu3}>
                  <Link
                    className={`${css.linkToWhere} ${css.menuMargin1}  ${css.menuMargin3}`}
                    to={'/login'}
                    style={{
                      borderBottom: validUnderMenu3
                        ? '2px solid white'
                        : 'none',
                    }}
                  >
                    극장
                  </Link>
                  {validUnderMenu3 ? (
                    <UnderMenu
                      margin={'500px'}
                      menu1={'전체극장'}
                      menu2={'특별관'}
                      menu3={''}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </li>
            </div>
            <div className={css.mainMenuBarColumn}>
              <li className={css.mainMenuBar}>
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin2}`}
                  to={'/'}
                >
                  <img src={mainImg}></img>
                </Link>
              </li>
            </div>
            <div className={css.mainMenuBarColumn}>
              <li className={css.mainMenuBar}>
                <div
                  className={css.tie}
                  onMouseOver={showUnderMenu4}
                  onMouseOut={closeUnderMenu4}
                >
                  <Link
                    className={`${css.linkToWhere} ${css.menuMargin2}`}
                    to={'/login'}
                    style={{
                      borderBottom: validUnderMenu4
                        ? '2px solid white'
                        : 'none',
                    }}
                  >
                    이벤트
                  </Link>
                  {validUnderMenu4 ? (
                    <UnderMenu
                      margin={'800px'}
                      menu1={'진행중 이벤트'}
                      menu2={'지난 이벤트'}
                      menu3={'당첨자발표'}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className={`${css.linkToWhere} ${css.padding}`}></div>
              </li>

              <li className={css.mainMenuBar}>
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin2}`}
                  to={'/login'}
                >
                  스토어
                </Link>
              </li>
              <li className={css.mainMenuBar}>
                <div onMouseOver={showUnderMenu5} onMouseOut={closeUnderMenu5}>
                  <Link
                    className={`${css.linkToWhere} ${css.menuMargin2}`}
                    to={'/login'}
                    style={{
                      borderBottom: validUnderMenu5
                        ? '2px solid white'
                        : 'none',
                    }}
                  >
                    혜택
                  </Link>
                  {validUnderMenu5 ? (
                    <UnderMenu
                      margin={'1050px'}
                      menu1={'메가박스 멤버십'}
                      menu2={'제휴/할인'}
                      menu3={''}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </li>
            </div>
            <li className={css.mainMenuBar}>
              <Link className={`${css.linkToWhere} `} to={'/timetable'}>
                <FaCalendarAlt className={css.headerIcon} />
              </Link>
              <span className={`${css.linkToWhere}`} to={'/login'}>
                {/* <AiOutlineUser
                  className={css.headerIcon}
                  onclick={memberShow}
                /> */}
                {ValidMember ? (
                  <AiFillCloseCircle
                    className={`${css.headIcon} ${css.closeIcon}`}
                    onClick={memberClose}
                  />
                ) : (
                  <AiOutlineUser
                    className={css.headerIcon}
                    onClick={memberShow}
                  />
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.position}>
        {validMenu ? <Dropdown style={{ position: 'relative' }} /> : ''}
        {validSearch ? <GlassDropdown style={{ position: 'relative' }} /> : ''}
        {ValidMember && validToken ? <Member /> : ''}
        {ValidMember && !validToken ? <NonMember /> : ''}
        {/* <Member /> */}
      </div>
    </>
  );
}

export default Header;
