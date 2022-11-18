import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import TimeTable from '../pages/TimeTable/TimeTable';
import Test from './Test';
import Test2 from './Test2';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
