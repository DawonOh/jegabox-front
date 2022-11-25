import React, { useState } from 'react';

function App() {
  const [zindex1, setZindex1] = useState(1);
  const [zindex2, setZindex2] = useState(1);
  const [zindex3, setZindex3] = useState(1);
  const [zindex4, setZindex4] = useState(1);
  const [zindex5, setZindex5] = useState(1);

  function onMouseOver(event) {
    if (event.target.innerText === '첫 번째 div') {
      setZindex1(200);
      console.log(1);
    }

    if (event.target.innerText === '두 번째 div') {
      setZindex2(200);
      console.log(2);
    }

    if (event.target.innerText === '세 번째 div') {
      setZindex3(200);
      console.log(3);
    }

    if (event.target.innerText === '네 번째 div') {
      setZindex4(200);
      console.log(4);
    }

    if (event.target.innerText === '다섯 번째 div') {
      setZindex5(200);
      console.log(5);
    }
  }

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <div>
        <div
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            right: '50px',
            border: '1px solid black',
            zIndex: zindex1,
            backgroundColor: 'black',
          }}
          onMouseOver={onMouseOver}
        ></div>
        <div
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            border: '1px solid black',
            right: '50px',
            zIndex: zindex2,
            backgroundColor: 'blue',
          }}
          onMouseOver={onMouseOver}
        ></div>
        <div
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            border: '1px solid black',
            right: '50px',
            zIndex: zindex3,
            backgroundColor: 'red',
          }}
          onMouseOver={onMouseOver}
        ></div>
        <div
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            border: '1px solid black',
            right: '50px',
            zIndex: zindex4,
            backgroundColor: 'yellow',
          }}
          onMouseOver={onMouseOver}
        ></div>
        <div
          style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            border: '1px solid black',
            right: '50px',
            zIndex: zindex5,
            backgroundColor: 'green',
          }}
          onMouseOver={onMouseOver}
        ></div>
      </div>

      <div onMouseOver={onMouseOver}>첫 번째 div</div>
      <div onMouseOver={onMouseOver}>두 번째 div</div>
      <div onMouseOver={onMouseOver}>세 번째 div</div>
      <div onMouseOver={onMouseOver}>네 번째 div</div>
      <div onMouseOver={onMouseOver}>다섯 번째 div</div>
    </div>
  );
}

export default App;
