import React, { Fragment } from 'react';
import css from './Goodbye.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import ChangeInfo from '../../components/UserInfo/ChangeInfo/ChangeInfo';

const Goodbye = () => {
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>회원 탈퇴</h1>
            <div className={css.userInfoMain}>
              <h2>
                회원님의 비밀번호를 입력하시고 [탈퇴] 버튼을 클릭해주세요.
              </h2>
              <table>
                <tbody>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th>인증번호</th>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={css.changeInfoBtns}>
                <button className={css.cancleBtn}>취소</button>
                <button className={css.disgoodbytJegaBoxBtn} disabled>
                  탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Goodbye;
