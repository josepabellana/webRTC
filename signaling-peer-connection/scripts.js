const socket = io.connect('https://localhost:8181/');
const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video')

let localStream;
let remoteStream;
let peerConfiguration = {
    iceServers:[
        {
            urls:[
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}

const call = async e => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    })

    localVideoEl.srcObject = stream;
    localStream = stream;


    // peerConnection is all set with our STUN servers sent over
    await createPeerConnection()

    // create offer time!
    try {
        console.log("creating offer");
        const offer = await peerConnection.createOffer();
        console.log(offer);
        peerConnection.setLocalDescription(offer)
    }catch(err) {

    }
}

const createPeerConnection = () => {
    return new Promise(async (res,rej) => {
        peerConnection = await new RTCPeerConnection(peerConfiguration);

        localStream.getTracks().forEach(track=>{
            peerConnection.addTrack(track,localStream)
        })
        peerConnection.addEventListener('icecandidate', e => {
            console.log('Ice candidate Found');
            console.log(e)
        })
        res();
    })
}

document.querySelector('#call').addEventListener('click', call());