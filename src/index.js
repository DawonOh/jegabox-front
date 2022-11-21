import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Router from './pages/Router';

import './styles/reset.scss';
import './styles/common.scss';
import Router from './pages/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />);
