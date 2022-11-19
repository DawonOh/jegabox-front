import React from 'react';
import css from './UnderMenu.module.scss';

const UnderMenu = props => {
  return (
    <div className={css.undermenu}>
      <span style={{ marginLeft: props.margin }}>{props.menu1}</span>
      <span>{props.menu2}</span>
      <span>{props.menu3}</span>
    </div>
  );
};

export default UnderMenu;
