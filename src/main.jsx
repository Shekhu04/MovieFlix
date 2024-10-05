import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // Proper import for createRoot
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';  // Correct import from react-router-dom
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';

// Create root with React 18 method
const root = createRoot(document.getElementById("root"));  // Proper React 18 root creation
root.render(
  <Provider store={store}>
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
  </Provider>
);
