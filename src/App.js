import { useRef, useState, useEffect } from 'react';
import Handler from './Utilities';

function App() {
  const canvasRef = useRef(null);
  const [handler, setHandler] = useState(new Handler());

  function getLocation(evt) {
    const bounds = canvasRef.current.getBoundingClientRect();
    return {
      "x": Math.floor(handler.size * (evt.clientX - bounds.left) / 500),
      "y": Math.floor(handler.size * (evt.clientY - bounds.top) / 500)
    }
  }

  useEffect(() => {
    const newContext = canvasRef.current.getContext('2d'); 
    setHandler(newHandler => {
      newHandler.context = newContext;
      newHandler.renderScreen();
      return newHandler;
    });
  }, []);

  function doRight(evt) {
    if(handler.ongoing) {
      const {x, y} = getLocation(evt);
      setHandler(newHandler => {
        newHandler.doRight(x, y);
        return newHandler;
      });
    }else{
      setHandler(newHandler => {
        newHandler.resizeGame(handler.size + 1);
        newHandler.renderScreen();
        return newHandler;
      });
    }
  }

  function doLeft(evt) {
    if(handler.ongoing) {
      const {x, y} = getLocation(evt);
      setHandler(newHandler => {
        newHandler.doLeft(x, y);
        return newHandler;
      });
    }
    
    evt.preventDefault();
  }

  return (
    <canvas ref={canvasRef} width="500" height="500" onClick={doRight} onContextMenu={doLeft}/>
  );
}

export default App;