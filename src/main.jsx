import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import './index.css';

const Root = () => {
  const [loading, setLoading] = useState(true);

  return loading
    ? <LoadingScreen onComplete={() => setLoading(false)} />
    : <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);