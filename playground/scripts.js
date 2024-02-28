let stream = null // Init stream var so we can use anywhere
const videoEl = document.getElementById('my-video');
let mediaStream = null
const getMicAndCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        console.log(stream);
        changeButtons([
            'green', 'blue', 'blue', 'grey', 'grey', 'grey', 'grey', 'grey'
        ])
    }catch (err){
        console.log("user denied access to constraints", err);
    }
}


const showMyFeed = e => {
    console.log("showMyFeed is working");
    if(!stream) {
        alert("stream still loading");
        return;
    }
    videoEl.srcObject = stream; // this will be set by getUserMedia
    const tracks = stream.getTracks();
    console.log(tracks);
    changeButtons([
        'green', 'green', 'blue', 'blue', 'blue', 'grey', 'grey', 'blue'
    ])
}

const stopMyFeed = e => {
    const tracks = stream.getTracks();
    tracks.forEach(track => {
        track.stop();
    })
    changeButtons([
        'blue', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'
    ])
}
document.querySelector('#share').addEventListener('click', e=>getMicAndCamera(e));

document.querySelector('#show-video').addEventListener('click', e=>showMyFeed(e));
document.querySelector('#stop-video').addEventListener('click',e => stopMyFeed(e));
document.querySelector('#change-size').addEventListener('click', e => changeVideoSize(e));
document.querySelector('#start-record').addEventListener('click', e => startRecording(e));
document.querySelector('#stop-record').addEventListener('click', e => stopRecording(e));
document.querySelector('#play-record').addEventListener('click', e => playRecording(e));
document.querySelector('#share-screen').addEventListener('click', e => shareScreen(e));

document.querySelector('#audio-input').addEventListener('change', e=> changeAudioInput(e));
document.querySelector('#audio-output').addEventListener('change', e=> changeAudioOutput(e));
document.querySelector('#video-input').addEventListener('change', e=> changeVideo(e));