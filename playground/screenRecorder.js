let mediaRecorder;
let recordedBlobs;
const startRecording = () => {
    if(!stream) {
        alert("no current feed");
        return;
    }
    console.log("Start Recording");
    recordedBlobs = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => {
        console.log("Data is available for the recorder");
        recordedBlobs.push(e.data);
    }
    mediaRecorder.start();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'blue', 'grey', 'blue'
    ])
}

const stopRecording = () => {
    if(!mediaRecorder){
        alert("please record before stopping");
        return;
    }
    console.log("Stop Recording");
    mediaRecorder.stop();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'blue', 'blue'
    ])
}

const playRecording = () => {
    if(!mediaRecorder){
        alert("no recording saved");
        return;
    }
    console.log("play Recording");
    const superBuffer = new Blob(recordedBlobs);
    const recordedVideoEl = document.getElementById("other-video");
    recordedVideoEl.src = window.URL.createObjectURL(superBuffer);
    recordedVideoEl.controls = true;
    recordedVideoEl.play();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'green', 'blue'
    ])
}