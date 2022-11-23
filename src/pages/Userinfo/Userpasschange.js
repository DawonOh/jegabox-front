import React, { Fragment } from 'react';
import css from './Userpasschange.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';

const Userpasschange = () => {
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>비밀번호 변경</h1>
            <div className={css.userInfoMain}>
              <p>
                현재 비밀번호를 입력한 후 새로 사용할 비밀번호를 입력하세요.
              </p>
              <table>
                <tbody>
                  <tr>
                    <th>현재 비밀번호</th>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>새 비밀번호</th>
                    <td>
                      <input type="text" />
                      <span>
                        ※ 영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리
                        이상으로 입력 해 주세요.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>새 비밀번호 재입력</th>
                    <td>
                      <input type="text" />
                      <span>
                        ※ 비밀번호 확인을 위해 한 번 더 입력해 주시기 바랍니다.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul>
                <li>
                  생년월일, 전화번호 등 개인 정보와 관련된 숫자, 연속된 숫자와
                  같이 쉬운 비밀번호는 다른 사람이 쉽게 알아낼 수 있으니 사용을
                  자제해 주세요.
                </li>
                <li>비밀번호는 3-6개월마다 꼭 바꿔 주세요.</li>
                <li>
                  비밀번호 변경시 모바일 기기와 홈페이지에서 모두
                  로그아웃됩니다. 변경한 비밀번호로 다시 로그인해주세요.
                </li>
                <li>
                  비밀번호 설정 시 사용가능한 특수문자는 ~ ! @ # $ % ^ & * + = -
                  ? _ 입니다.
                </li>
              </ul>
            </div>
            <div className={css.changeInfoBtns}>
              <button className={css.cancleBtn}>취소</button>
              <button className={css.changeInfoBtn}>수정</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Userpasschange;
