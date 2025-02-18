import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main/Main';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import WholeMovie from './WholeMovie/WholeMovie';
import TimeTable from '../pages/TimeTable/TimeTable';
import Mypage from '../pages/Mypage/Mypage';
import MovieStory from '../pages/MypageMovieStory/MypageMovieStory';
import Userfind from './Login/Userfind/Userfind';
import DetailPage from './DetailPage/DetailPage';
import Booking from './Booking/Booking';
import PlanningMovie from './WholeMovie/PlanningMovie/PlanningMovie';
import Join from './Join/Join';
import Userinfo from './Userinfo/Userinfo';
import Goodbye from './Userinfo/Goodbye';
import Userpasschange from './Userinfo/Userpasschange';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userfind" element={<Userfind />} />
        <Route path="/movie" element={<WholeMovie />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/moviestory" element={<MovieStory />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/movie/comingsoon" element={<PlanningMovie />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage/userinfo" element={<Userinfo />} />
        <Route path="/mypage/goodbye-jegabox" element={<Goodbye />} />
        <Route path="/mypage/userpasschange" element={<Userpasschange />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
