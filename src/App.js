function App() {
  function doDraw(evt) {
    console.log(evt.clientX, evt.clientY);
  }

  return (
    <canvas width="500" height="500" onClick={doDraw}/>
  );
}

export default App;