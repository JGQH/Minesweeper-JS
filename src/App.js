import { useRef, useState, useEffect } from 'react';
import unclickedCell from './imgs/unclickedCell.png';

function getImages() {
  function processImg(src) {
    const image = new Image(32, 32);
    image.src = src;
    return image
  }
  return {
    "unclickedCell": processImg(unclickedCell)
  }
}

function App() {
  const images = getImages();
  const canvasRef = useRef(null);
  const [size, setSize] = useState(7);
  const [context, setContext] = useState(null);

  function gameSetup(newContext) {
    newContext.save();
    const scaler = 500 / size;
    for(let x = 0; x < size; x++){
      for(let y = 0; y < size; y++){
        newContext.drawImage(images.unclickedCell, x * scaler, y * scaler, scaler, scaler)
      }
    }
    newContext.restore();
  };

  useEffect(() => {
    const newContext = canvasRef.current.getContext('2d'); 
    setContext(newContext);
    gameSetup(newContext);
  }, []);

  function doDraw(evt) {
    console.log(evt.clientX, evt.clientY);
  }

  return (
    <canvas ref={canvasRef} width="500" height="500" onClick={doDraw}/>
  );
}

export default App;