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
      <Footer />
    </>
  );
}

export default Main;
