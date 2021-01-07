  
import { useState } from "react";

const defaultDisplayMediaOptions = {
  audio: true,
  video: { cursor: "always" },
};

function useScreenRecording({
  displayMediaOptions = defaultDisplayMediaOptions,
  onEnd = () => {},
  onError = () => {},
  onStart = () => {},
} = {}) {
  const [captureStream, setCaptureStream] = useState(null);
  const [error, setError] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const stopRecording = () => {
    try {
      setIsRecording(false);
      mediaRecorder.stop();
      captureStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      onError(e);
      setError(e);
    }
  };


  const startRecording = async () => {  
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      setIsRecording(true);
      stream.getTracks().forEach((track) => {
        track.onended = stopRecording;
      });
      setCaptureStream(stream);
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        onEnd(event);
        setRecording(event.data);
      };
      recorder.start();
      setMediaRecorder(recorder);
      onStart({ stream, recorder });
    } catch (e) {
      setIsRecording(false);
      onError(e);
      setError(e);
    }
  };



  const toggleRecording = () => {
      return isRecording ? stopRecording() : startRecording();
  }

  return {
    captureStream,
    error,
    isRecording,
    mediaRecorder,
    recording,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}

export default useScreenRecording;
