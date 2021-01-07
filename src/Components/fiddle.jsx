const { useRef } = require("react");

<div id='screenshot'>
    <img ref={imgRef} src=''/>
    <video ref={vidRef} autoplay></video>
    <canvas style={{display: "none"}}></canvas>
    <button class='capture-button'>Capture</button>
</div>
// const captureVideoButton = document.querySelector('.capture-button');
const imgRef = useRef(null);
// document.querySelector('#screenshot img');
const vidRef = useRef(null);
// document.querySelector('#screenshot video');
const canvas = React.createElement('canvas')
// document.createElement('canvas')
function screenshot() {
    canvas.width = vidRef.videoWidth;
    canvas.height = vidRef.videoHeight;
  
    canvas.getContext('2d').drawImage(video, 0, 0);
  
    let dataUrl = canvas.toDataURL('image/png');
    img.src = dataUrl;
  
    const hrefElement = document.createElement('a');
    hrefElement.href = dataUrl;
    document.body.append(hrefElement);
    hrefElement.download = 'screenshot.png';
    hrefElement.click();
    hrefElement.remove();
  }

  screenshot();