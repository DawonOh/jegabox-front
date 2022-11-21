import React from 'react';
import css from './Ad.module.scss';

function Ad({ link, url, desc }) {
  return (
    <div className={css.container}>
      <a href={link} alt="post">
        <p>AD</p>
        <img src={url} alt="jsop" />
        <h2>{desc}</h2>
      </a>
    </div>
  );
}

export default Ad;
