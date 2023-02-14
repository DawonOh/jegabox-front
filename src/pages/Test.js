import React, { useState } from 'react';
import css from './test.module.scss';

function App() {
  const [img, setImg] = useState();

  function onMouseOver(event) {
    if (event.target.innerText === '첫 번째 div')
      setImg(
        'https://images.unsplash.com/photo-1668656690938-bbb5ec240ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
      );

    if (event.target.innerText === '두 번째 div')
      setImg(
        'https://images.unsplash.com/photo-1668613963894-1371690b9593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
      );

    if (event.target.innerText === '세 번째 div')
      setImg(
        'https://images.unsplash.com/photo-1668668246593-b00fb0aad5cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
      );

    if (event.target.innerText === '네 번째 div')
      setImg(
        'https://images.unsplash.com/photo-1668661555246-17b2b7b087e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5N3x8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'
      );

    if (event.target.innerText === '다섯 번째 div')
      setImg(
        'https://images.unsplash.com/photo-1668437845117-9fdf000fa990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
      );
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${img})`,
          width: '100px',
          height: '200px',
          backgroundSize: 'cover',
          border: '1px solid black',
        }}
      ></div>
      <div onMouseOver={onMouseOver}>첫 번째 div</div>
      <div onMouseOver={onMouseOver}>두 번째 div</div>
      <div onMouseOver={onMouseOver}>세 번째 div</div>
      <div onMouseOver={onMouseOver}>네 번째 div</div>
      <div onMouseOver={onMouseOver}>다섯 번째 div.</div>

      <label className={css.switch}>
        <input type="checkbox" />
        <span className={`${css.slider} ${css.round}`}></span>
      </label>
    </div>
  );
}

export default App;
