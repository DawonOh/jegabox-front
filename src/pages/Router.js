import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main/Main';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import TimeTable from '../pages/TimeTable/TimeTable';
import Test from './Test';
import Test2 from './Test2';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timetable" element={<TimeTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
