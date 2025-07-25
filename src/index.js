import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Correct import for React 18/19
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
