import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client in React 18
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root div
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
