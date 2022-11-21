import React from 'react';
import Header from '../../components/Header/Header';
import css from './Main.module.scss';
import MainComponent from '../../components/MainComponent/MainComponent';
import MainIntroduce from '../../components/MainIntroduce/MainIntroduce';
import Footer from '../../components/Footer/Footer';

function Main() {
  return (
    <>
      <Header />
      <MainComponent />
      <MainIntroduce />
      <div className={css.ad}>
        <p>AD</p>
        <a href="http://54.180.128.213:3000/">
          <img src="/image/market.png" alt="jsop" />
        </a>
        <h2> 먹거리 쇼핑은 어디? 구멍마켓</h2>
      </div>
      <Footer />
    </>
  );
}

export default Main;
