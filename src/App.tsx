import React from 'react';
import MainContainer from './components/MainContainer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <MainContainer />
    </div>
  );
};

export default App;
