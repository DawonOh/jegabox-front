import React, { useEffect, useState } from 'react';

function App({ curr, name, setAreaClickCheck, areaClickCheck, setCurrArea }) {
  const [areaBackColor, setAreaBackColor] = useState('white');
  const [spanColor, setSpanColor] = useState('black');
  function areaClick(event) {
    setAreaClickCheck(curr);
    setCurrArea(event.target.innerText);
  }
  useEffect(() => {
    areaClickCheck === curr
      ? setAreaBackColor('rgb(85, 85, 85)')
      : setAreaBackColor('white');

    areaClickCheck === curr
      ? setSpanColor('white')
      : setSpanColor('rgb(85, 85, 85)');
  }, [areaClickCheck]);

  return (
    <div
      style={{
        width: '137px',
        height: '34px',
        border: '1px black solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: areaBackColor,
      }}
      onClick={areaClick}
    >
      <span style={{ color: spanColor }}>{name}</span>
    </div>
  );
}

export default App;
