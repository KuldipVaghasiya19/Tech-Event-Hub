import React from 'react';
import ReactDOM from 'react-dom/client'; // import the new createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Wrap your app with BrowserRouter
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot instead of ReactDOM.render

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
