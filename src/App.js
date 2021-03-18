import { useRef, useState, useEffect } from 'react';
import Handler from './Utilities';

function App() {
  const canvasRef = useRef(null);
  const [handler, setHandler] = useState(new Handler());

  function gameSetup() {
    for(let x = 0; x < handler.size; x++){
      for(let y = 0; y < handler.size; y++){
        handler.drawTile(x, y);
      }
    }
  };

  useEffect(() => {
    const newContext = canvasRef.current.getContext('2d'); 
    setHandler(newHandler => {
      newHandler.context = newContext;
      return newHandler;
    });
    gameSetup();
  }, []);

  function doDraw(evt) {
    console.log(evt.clientX, evt.clientY);
  }

  return (
    <canvas ref={canvasRef} width="500" height="500" onClick={doDraw}/>
  );
}

export default App;