import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Safely access the root element and ensure it's not null
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure there is a <div id="root"></div> in your index.html.');
}

// Use `createRoot` to initialize the app
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log performance metrics or send them to an analytics endpoint
// For example: reportWebVitals(console.log)
reportWebVitals();
