// popup/src/components/BlockList.jsx

/* global chrome */

import React, { useState, useEffect } from 'react';
import '../styles/BlockList.css';

const BlockList = () => {
  const [blockList, setBlockList] = useState([]);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(['blockList'], (result) => {
      if (result.blockList) {
        setBlockList(result.blockList);
      }
    });
  }, []);

  const addUrl = () => {
    if (newUrl && !blockList.includes(newUrl)) {
      const updatedList = [...blockList, newUrl];
      setBlockList(updatedList);
      chrome.storage.sync.set({ blockList: updatedList });
      setNewUrl('');
    }
  };

  const removeUrl = (url) => {
    const updatedList = blockList.filter((item) => item !== url);
    setBlockList(updatedList);
    chrome.storage.sync.set({ blockList: updatedList });
  };

  return (
    <div className="blocklist">
      <h2>Block List</h2>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Enter URL to block"
      />
      <button onClick={addUrl}>Add</button>
      <ul>
        {blockList.map((url, index) => (
          <li key={index}>
            {url}
            <button onClick={() => removeUrl(url)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockList;
