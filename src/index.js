import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css'; // Om du har en CSS-fil för generell styling

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
