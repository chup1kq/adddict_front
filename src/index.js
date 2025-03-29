import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './static/styles/bootstrap/bootstrap.min.css';
import './bootstrap/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
