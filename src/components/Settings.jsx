// popup/src/components/Settings.jsx

/* global chrome */

import React, { useState, useEffect } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(['enabled'], (result) => {
      if (result.enabled !== undefined) {
        setEnabled(result.enabled);
      } else {
        chrome.storage.sync.set({ enabled: true });
      }
    });
  }, []);

  const toggleEnabled = () => {
    const newStatus = !enabled;
    setEnabled(newStatus);
    chrome.storage.sync.set({ enabled: newStatus });
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggleEnabled}
        />
        Enable Blocking
      </label>
    </div>
  );
};

export default Settings;
