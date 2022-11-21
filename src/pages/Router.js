import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main/Main';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import WholeMovie from './WholeMovie/WholeMovie';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie" element={<WholeMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
