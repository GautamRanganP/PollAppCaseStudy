import React, { useState, useEffect } from 'react';

function BrowserId() {
  const [hasPolled, setHasPolled] = useState(false);
  const [browserId, setBrowserId] = useState(null);

  useEffect(() => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const id = array[0];
    setBrowserId(id);

    // check if user has already polled
    const hasPolled = localStorage.getItem(`hasPolled:${id}`);
    if (hasPolled) {
        console.log("haspolled")
      setHasPolled(true);
    }
  }, []);

  const handlePoll = () => {
    // mark user as having polled
    localStorage.setItem(`hasPolled:${browserId}`, true);
    setHasPolled(true);
  };

  return (
    <div>
      {hasPolled ? (
        <p>You have already polled. Thanks for your response!</p>
      ) : (
        <div>
          <p>Have you ever tried sushi?</p>
          <button onClick={handlePoll}>Yes</button>
          <button onClick={handlePoll}>No</button>
        </div>
      )}
    </div>
  );
}

export default BrowserId;
