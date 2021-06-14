import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './DeckApp';
import reportWebVitals from './reportWebVitals';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGlyb2tpLWJlZ3VydSIsImEiOiJja290amUxaXAwYWFvMnZucDBwbXU4bjJsIn0.Ad-0OFDOlqay5Vphsqf-HA';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();