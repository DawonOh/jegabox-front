import React from 'react';
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
function Header() {
  const [menu, setMenu] = useState(false);
  const [validMenu, setValidMenu] = useState(false);

  function menuSHow() {
    setValidMenu(true);
  }
  function menuClose() {
    setValidMenu(false);
  }
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
              <span>로그인</span>
              <span>회원가입</span>
              <span>빠른예매</span>
            </div>
          </div>
          <ul className={css.mainWholeBar}>
            <li className={css.mainMenuBar}>
              <div className={`${css.linkToWhere}`} to={'/login'}>
                {validMenu ? (
                  <AiFillCloseCircle
                    className={`${css.headIcon} ${css.closeIcon}`}
                    onClick={menuClose}
                  />
                ) : (
                  <FiMenu className={css.headerIcon} onClick={menuSHow} />
                )}
              </div>

              <span
                className={`${css.linkToWhere} ${css.menuMargin1}`}
                to={'/login'}
              >
                <BiSearch className={css.headerIcon} />
              </span>
            </li>
            <div className={css.mainMenuBarColumn}>
              <li className={css.mainMenuBar}>
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin1}`}
                  to={'/login'}
                >
                  영화
                </Link>
              </li>
              <li className={css.mainMenuBar}>
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin1}`}
                  to={'/login'}
                >
                  예매
                </Link>
              </li>
              <li className={css.mainMenuBar}>
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin1}  ${css.menuMargin3}`}
                  to={'/login'}
                >
                  극장
                </Link>
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
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin2}`}
                  to={'/login'}
                >
                  이벤트
                </Link>
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
                <Link
                  className={`${css.linkToWhere} ${css.menuMargin2}`}
                  to={'/login'}
                >
                  혜택
                </Link>
              </li>
            </div>
            <li className={css.mainMenuBar}>
              <Link className={`${css.linkToWhere} `} to={'/login'}>
                <FaCalendarAlt className={css.headerIcon} />
              </Link>
              <Link className={`${css.linkToWhere}`} to={'/login'}>
                <AiOutlineUser className={css.headerIcon} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {validMenu ? <Dropdown /> : ''}
    </>
  );
}

export default Header;
