import React, { useState, useEffect } from 'react';
import UserBookingInfo from '../../components/Mypage/UserBookingInfo';
import css from './BookingInfo.module.scss';

function App({ bookingList }) {
  const [selectValue, setSelectValue] = useState();

  const date = new Date();

  function radioChange(event) {
    const select = document.querySelector('#bookingFilter');
    if (event.target.value === '지난내역') select.removeAttribute('disabled');
    if (event.target.value === '예매내역')
      select.setAttribute('disabled', 'disabled');
  }

  function selectChacnge(event) {
    setSelectValue(event.target.value);
  }

  function btnClick(event) {
    console.log(selectValue);
  }

  useEffect(() => {
    setSelectValue(`${date.getFullYear()}년 ${date.getMonth() + 1}월`);
  }, []);

  return (
    <div className={css.main}>
      <div className={css.title}>예매/구매 내역</div>
      <div className={css.booking}>
        <div
          className={css.bookingBtn}
          style={{ backgroundColor: 'rgb(85, 85, 85)', color: 'white' }}
        >
          예매
        </div>
        <div className={css.bookingBtn}>구매</div>
      </div>
      <div className={css.filterDiv}>
        <div className={css.filterDivTitle}>구분</div>
        <div>
          <input
            type="radio"
            name="filter"
            defaultChecked
            onChange={radioChange}
            value="예매내역"
          ></input>
          <label>예매내역</label>
          <input
            type="radio"
            name="filter"
            onChange={radioChange}
            value="지난내역"
          ></input>
          <label>지난내역</label>
          <select
            className={css.bookSelcet}
            name="pets"
            id="bookingFilter"
            onChange={selectChacnge}
            disabled
          >
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 1
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 2
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 3
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 4
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 5
            }월`}</option>
            <option>{`${date.getFullYear()}년 ${
              date.getMonth() - 6
            }월`}</option>
          </select>
          <button onClick={btnClick}>조회</button>
        </div>
      </div>

      {bookingList.length === 0 ? (
        <div className={css.bookingDone}>예매 내역이 없습니다</div>
      ) : (
        bookingList.map((elem, idx) => {
          return <UserBookingInfo key={idx} elem={elem} />;
        })
      )}
    </div>
  );
}

export default App;
