import React, { useState, useEffect } from 'react';

function ToolTip() {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const targetElement = document.querySelector(".document");
    if (targetElement) {
      const { x, y } = targetElement.getBoundingClientRect();
      setPosition({ x, y });
    }
    const timeoutId = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  return visible ? (
    <button
      style={{
        position: 'absolute',
        top: `${position.y - 40}px`,
        left: `${position.x-150}px`,
        padding: '8px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '5px',
        border: 'none',
        // cursor: 'pointer',
      }}
    >
      메뉴는 여기서 다시 확인할 수 있어요.
    </button>
  ) : null;
}

export default ToolTip;
