import React from "react";

import useScreenRecording from './Components/screen-recorder';

function App() {
  const { isRecording, recording, toggleRecording } = useScreenRecording();

  return (
    <div className="root">
      <h1>React Hook</h1>
      <h2>useScreenRecording</h2>
      <h2>what I'm trying to do here</h2>

      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start Recording"}
      </button>
      {!!recording && (
        <video
          className="video"
          src={recording && URL.createObjectURL(recording)}
          controls
        />
      )}
    </div>
  );
}

export default App;

