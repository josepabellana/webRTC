const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstraints);

const changeVideoSize = () => {
    stream.getVideoTracks().forEach(track => {
        //track is a video track
        const height = document.getElementById('vid-height').value;
        const width = document.getElementById('vid-width').value;
        const vConstraints = {
            height: { exact: height < MediaCapabilities.height.max ? height : MediaCapabilities.height.max },
            width: { exact: width < MediaCapabilities.width.max ? width : MediaCapabilities.width.max },
            // frameRate: 5,
            // aspectRatio: 10,
        }
        track.applyConstaints(vConstraints);
    })
    // stream.getTracks().forEach(track => {
    //     const cap = track.getCapabilities();
    //     console.log(cap);
    // })
}