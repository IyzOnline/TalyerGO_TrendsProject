import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ShopsProvider } from './components/ShopsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopsProvider>
      <App />
    </ShopsProvider>
  </React.StrictMode>
);