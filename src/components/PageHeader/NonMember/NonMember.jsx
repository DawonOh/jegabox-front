import React from 'react';
import css from './NonMember.module.scss';
const NonMember = () => {
  return (
    <div className={css.position}>
      <div className={css.nonMemberWhole}>
        <p className={css.comment}>
          로그인 하시면 나의 제가박스를 만날 수 있어요.
        </p>
        <p className={css.comment}>
          이 모달창이 있는 줄 지금 알았네요? 헤더만드는데 3일이 걸렸어요!
        </p>
        <button className={css.loginBtn}>로그인</button>
        <div className={css.border}>
          <p className={css.signup}>혹시 아직도 회원이 아니신가요?</p>
        </div>
      </div>
    </div>
  );
};

export default NonMember;
