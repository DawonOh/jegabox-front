import React from 'react';
import Header from '../../components/Header/Header';
import css from './Main.module.scss';
import MainComponent from '../../components/MainComponent/MainComponent';
import MainIntroduce from '../../components/MainIntroduce/MainIntroduce';
import Footer from '../../components/Footer/Footer';

function Main() {
  console.log(localStorage.getItem('token'));
  return (
    <>
      <Header />
      <MainComponent />
      <MainIntroduce />
      <div className={css.ad}>
        <p>AD</p>
        <a href="http://54.180.128.213:3000/">
          <img style={{ height: '140px' }} src="/image/market.png" alt="jsop" />
        </a>
        <h2> 드루와 구멍으로 드루와</h2>
      </div>
      <Footer />
    </>
  );
}

export default Main;
