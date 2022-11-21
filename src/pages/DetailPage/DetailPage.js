import React from 'react';
import css from './DetailPage.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';

function DetailPage() {
  const data = [
    {
      id: 1,
      ko_title: '데시벨',
      en_title: 'Decibel',
      description: '소음이 커지는 순간 폭.발.한다',
      Sub: '어의 ‘이형익’에게 그 재주를 인정받아 궁으로 들어간다. 그 무렵, 청에 인질로 끌려갔던 ‘소현세자’가 8년 만에 귀국하고,‘인조’는 아들을 향한 반가움도 잠시 정체 모를 불안감에 휩싸인다.',
      movie_poster:
        'https://img.megabox.co.kr/SharedImg/2022/11/17/9isi3N0BKJ8ESfnrb5FtH5fNbaMAgZ2I_420.jpg',
      like: 666,
      movie_time: 110,
      director: '황인호',
      actors: '김래원, 이종석, 정상훈, 박병은, 이상희, 조달환, 차은우, 이민기',
      genre: '액션',
      grade: '12세이상관람가',

      viewer: 0,
      release_date: '2022-11-15T15:00:00.000Z',
      cnt: 667,
      type: ['2D', '2D ATMOS'],
    },
  ];
  const prtGrade = grade => {
    return <img className={css.grade} src={`image/${grade}.png`} alt="grade" />;
  };

  return (
    <div className={css.container}>
      <PageHeader />
      <div className={css.photo}>
        <div className={css.head}>
          <img className={css.bg_img} src={data[0].movie_poster} alt="사진" />
          <div className={css.black}></div>
          <button className={css.booking}>예매하기</button>
          {prtGrade(12)}
          <p className={css.title}>{data[0].ko_title}</p>
          <p className={css.en_title}>{data[0].en_title}</p>
          <img className={css.poster} src={data[0].movie_poster} alt="사진" />
        </div>
      </div>
      <div className={css.info}>
        <button className="m_info">주요정보</button>
        <button className="comment">실관람평</button>

        <div className={css.desc}>desc</div>
        <div className={css.infoContent}>감독 정보</div>
      </div>
    </div>
  );
}

export default DetailPage;
