import React, { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('#ffffff');

  const changeBackgroundColor = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.startsWith('http')) {
        alert('Cannot change background color on this page.');
        return;
      }
      
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setBackgroundColor,
        args: [color],
      });
      
    } catch (error) {
      console.error('Error changing background color:', error);
      alert('Failed to change background color. Please try again on a different page.');
    }
  };

  function setBackgroundColor(selectedColor) {
    document.body.style.backgroundColor = selectedColor;
  }

  return (
    <div className="App">
      <h1>Change Background Color</h1>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={changeBackgroundColor}>Change Color</button>
    </div>
  );
}

export default App;
