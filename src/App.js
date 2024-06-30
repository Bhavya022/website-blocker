// popup/src/App.js

import React from 'react';
import BlockList from './components/BlockList';
import Settings from './components/Settings';
import './styles/App.css'; // Assuming a separate CSS file for the main app

const App = () => {
  return (
    <div className="app">
      <h1>Website Blocker</h1>
      <BlockList />
      <Settings />
    </div>
  );
};

export default App;
