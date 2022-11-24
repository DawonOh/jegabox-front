import React, { useEffect, useRef, useState } from 'react';
import css from './DetailPage.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
function DetailPage() {
  const location = useLocation();
  const [onDesc, setOnDesc] = useState(true);
  const [comment, setComment] = useState(false);
  const [commentArr, setCommentArr] = useState([]);
  const [commentArr_l, setCommentAr_l] = useState([]);
  const [data, setData] = useState([]);
  const [like, setLike] = useState();
  const [rate, setRate] = useState(0);
  const navigate = useNavigate();
  const commentValue = useRef();
  const rateNum = useRef();
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const movieId = query.movieNo;
  // 1. 첫 랜더링시 영화 포스터 정보 저장
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/movie/detail/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  }, []);

  // 2. 영화 포스터 정보 변경 시 실행, lickCnt 저장
  useEffect(() => {
    console.log('in');
    if (data) {
      setLike(data.isLiked);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/comments?pstMovieNo=${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setCommentArr(res.data));
  }, [commentArr_l]);

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
        movie_id: data.id,
        rate: rate,
        comment: comment,
      }),
    });
    setRate(0);
    setCommentAr_l(...commentArr_l, comment);
    commentValue.current.value = '';
    rateNum.current.value = '';
  };

  // 3. heart 클릭 시 실행
  const handleLike = async () => {
    const token = localStorage.getItem('token');

    //영화 id 서버로 전송
    await fetch(`http://localhost:8000/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        movie_id: movieId,
      }),
    });

    //data 갱신
    fetch(`http://localhost:8000/movie/detail/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
      });
  };

  return (
    <div className={css.container}>
      <PageHeader />
      {data && (
        <div className={css.photo}>
          <div className={css.head}>
            <img className={css.bg_img} src={data.movie_poster} alt="사진" />
            <div className={css.black}></div>
            <button
              className={css.booking}
              onClick={() => {
                navigate('/booking');
              }}
            >
              예매하기
            </button>
            {prtGrade(data.grade_simple)}
            <p className={css.title}>{data.ko_title}</p>
            <p className={css.en_title}>{data.en_title}</p>
            <button onClick={() => handleLike()} className={css.heart}>
              {like ? (
                <img
                  src="/image/fillheart.png"
                  alt="fillheart"
                  width="20px"
                  height="20px"
                />
              ) : (
                <img
                  src="/image/heart.png"
                  alt="heart"
                  width="20px"
                  height="20px"
                />
              )}
              <p>{data.cnt}</p>
            </button>
            <img className={css.poster} src={data.movie_poster} alt="사진" />
            <p className={css.w_review}>실관람 평점</p>
            <img
              className={css.r_icon}
              src="/image/review.png"
              alt="reviewicon"
            />
            <p className={css.review}>{data.rated}</p>
          </div>
        </div>
      )}
      {data.type && (
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
              <div className={css.desc}>{data.description}</div>
              <div className={css.infoContent}>
                <p>{data.sub_description}</p>
              </div>
              <div className={css.movieStuff}>
                <p>
                  상영타입 :
                  {data.type.map((e, idx) =>
                    data.type.length > idx + 1 ? (
                      <span key={idx}> {e}, </span>
                    ) : (
                      <span key={idx}>{e} </span>
                    )
                  )}
                </p>
                <p className={css.director}>
                  <span>감독 : {data.director} </span>{' '}
                  <span>
                    장르 : {data.genre}/{data.movie_time}분
                  </span>{' '}
                  <span>등급 : {data.grade} </span>{' '}
                  <span>개봉일 : 20{data.release_date}</span>
                </p>
                <p>출연진 : {data.actors}</p>
              </div>
            </div>
          )}
          <div className={css.comment_zone}>
            <div className={css.reviewComment}>
              <p>
                {data.ko_title}에 대한{' '}
                <span className={css.reviewNum}>{commentArr.length}</span> 개의
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
                    placeholder={`${data.ko_title} 재미있게 보셨나요? 영화의 어떤 점이 좋았는지 이야기해주세요.`}
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
      )}

      <Footer />
    </div>
  );
}

export default DetailPage;
