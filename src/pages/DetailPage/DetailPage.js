import React, { useEffect, useRef, useState } from 'react';
import css from './DetailPage.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
function DetailPage() {
  // const location = useLocation();
  const [onDesc, setOnDesc] = useState(true);
  const [comment, setComment] = useState('');
  const [commentArr, setCommentArr] = useState([]);
  const [commentArr_l, setCommentAr_l] = useState([]);
  const [rate, setRate] = useState(0);
  const navigate = useNavigate();
  const commentValue = useRef();
  const rateNum = useRef();
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log(location.search);
  const data = [
    {
      id: 1,
      ko_title: '데시벨',
      en_title: 'Decibel',
      description: '소음이 커지는 순간 폭.발.한.다',
      sub: '물이 끓는 주전자 소리, 창문 여는 소리, 놀이터 아이들의 웃음 소리… 잠시 후, 거대한 굉음과 함께 단독 주택이 폭발했다는 뉴스 속보가 전해진다. 그리고, 뉴스를 지켜보던 전직 해군 부함장(김래원)에게 걸려온 전화 “소음이 커지면 터집니다. 다음 타깃은 축구 경기장이에요” 사태를 파악할 겨를도 없이, 관중들로 가득 찬 축구 경기장을 다음 테러의 타깃으로 지목하는 폭탄 설계자(이종석)',
      movie_poster:
        'https://img.megabox.co.kr/SharedImg/2022/11/17/9isi3N0BKJ8ESfnrb5FtH5fNbaMAgZ2I_420.jpg',
      like: 666,
      movie_time: 110,
      director: '황인호',
      actors: '김래원, 이종석, 정상훈, 박병은, 이상희, 조달환, 차은우, 이민기',
      genre: '액션',
      grade: '12세이상관람가',
      review: '9.5',
      viewer: 8,
      release_date: '2022-11-15T15:00:00.000Z',
      cnt: 667,
      reviewer: 0,
      type: ['2D', '2D ATMOS'],
    },
  ];

  const prtGrade = grade => {
    return <img className={css.grade} src={`image/${grade}.png`} alt="grade" />;
  };
  const sendComment = () => {
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/comments/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        movie_id: data[0].id,
        rate: rate,
        comment: comment,
      }),
    });
    setRate(0);
    setCommentAr_l(...commentArr_l, comment);
    commentValue.current.value = '';
    rateNum.current.value = '';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/comments?pstMovieNo=${data[0].id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setCommentArr(res.data));
  }, [commentArr_l]);

  return (
    <div className={css.container}>
      <PageHeader />
      <div className={css.photo}>
        <div className={css.head}>
          <img className={css.bg_img} src={data[0].movie_poster} alt="사진" />
          <div className={css.black}></div>
          <button
            className={css.booking}
            onClick={() => {
              navigate('/booking');
            }}
          >
            예매하기
          </button>
          {prtGrade(12)}
          <p className={css.title}>{data[0].ko_title}</p>
          <p className={css.en_title}>{data[0].en_title}</p>
          <button className={css.heart}>{data[0].like}</button>
          <img className={css.poster} src={data[0].movie_poster} alt="사진" />
          <p className={css.w_review}>실관람 평점</p>
          <img
            className={css.r_icon}
            src="/image/review.png"
            alt="reviewicon"
          />
          <p className={css.review}>{data[0].review}</p>
        </div>
      </div>
      <div className={css.info}>
        <button
          className={`${
            css.m_info + (onDesc === true ? ' ' + css.active : '')
          }`}
          onClick={() => setOnDesc(true)}
        >
          주요정보
        </button>
        <button
          className={`${
            css.comment + (onDesc === false ? ' ' + css.active : '')
          }`}
          onClick={() => setOnDesc(false)}
        >
          실관람평
        </button>
        {onDesc && (
          <div className={css.movie_info}>
            <div className={css.desc}>{data[0].description}</div>
            <div className={css.infoContent}>
              <p>{data[0].sub}</p>
            </div>
            <div className={css.movieStuff}>
              <p>
                상영타입 :
                {data[0].type.map((e, idx) =>
                  data[0].type.length > idx + 1 ? (
                    <span key={idx}> {e}, </span>
                  ) : (
                    <span key={idx}>{e} </span>
                  )
                )}
              </p>
              <p className={css.director}>
                <span>감독 : {data[0].director} </span>{' '}
                <span>
                  장르 : {data[0].genre}/{data[0].movie_time}분
                </span>{' '}
                <span>등급 : {data[0].grade} </span> 개봉일 :
                {data[0].release_date}
              </p>
              <p>출연진 : {data[0].actors}</p>
            </div>
          </div>
        )}
        <div className={css.comment_zone}>
          <div className={css.reviewComment}>
            <p>
              {data[0].ko_title}에 대한{' '}
              <span className={css.reviewNum}>{data[0].reviewer}</span>개의
              이야기가 있어요!
            </p>
            <div className={css.comment_area}>
              <div className={css.userProfile}>
                <div className={css.mega_profile}>M</div>
                <p>MEGA_BOX</p>
              </div>
              <div className={css.write_zone}>
                <select
                  className={css.rate_area}
                  ref={rateNum}
                  onChange={e => setRate(e.target.value)}
                >
                  {nums.map((num, idx) => (
                    <option key={idx} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <input
                  ref={commentValue}
                  onChange={e => setComment(e.target.value)}
                  placeholder={`${data[0].ko_title} 재미있게 보셨나요? 영화의 어떤 점이 좋았는지 이야기해주세요.`}
                />
                <button className={css.submit} onClick={sendComment}>
                  관람평 쓰기
                </button>
              </div>
            </div>
          </div>
          <div className={css.userComment_area}>
            {commentArr
              ? commentArr.map((comment, idx) => (
                  <div key={idx} className={css.comment_area}>
                    <div className={css.userProfile}>
                      <div className={css.mega_profile}>
                        {comment.account_id[0]}
                      </div>
                      <p>{comment.account_id}</p>
                    </div>
                    <div className={css.write_zone}>
                      <div className={css.review}>관람평</div>
                      <div className={css.commentRate}>{comment.rating}</div>
                      <div className={css.commentDesc}>{comment.comment}</div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailPage;
