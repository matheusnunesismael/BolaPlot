import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {SceneProvider} from './context/Scene';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SceneProvider>

    <App />
    </SceneProvider>
  </React.StrictMode>
);

