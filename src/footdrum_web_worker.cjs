// Importing the required modules
console.clear();
// const playButton = document.querySelector('button');
// console.log("playbutton", playButton);
var drumstate = 0;
var initilaize = 1;
var audioContext = null;
var drumElement = null;
var drumTrack = null;
var snareTrack = null;
var AudioCC = null;
// playButton.addEventListener('click', drumHandler);


function drumHandler() {
if (initilaize == 0) {
    console.log('1');
    //initilaize += 1;
    console.log('12');
    AudioCC = window.AudioContext || window.webkitAudioContext;
    console.log('123');
    audioContext = new AudioCC();
    console.log('11');
    drumElement = document.querySelector('#mp31')
    console.log('12');
    drumTrack = audioContext.createMediaElementSource(drumElement);
    snareElement = document.querySelector('#mp32')
    snareTrack = audioContext.createMediaElementSource(snareElement);
    console.log('2');
    if (audioContext.state === 'suspended') { //autoplay policy
        audioContext.resume();
    }
    drumTrack.connect(audioContext.destination);
    snareTrack.connect(audioContext.destination);
    console.log("initialization complete!")
    // }

    //TO-DO: make a working switch instrument mechanism

    //    if (drumstate == 1) {
    //        drumstate = 0;
    //        return;
    //    }
    //call drum loop
}
}

var activated = 0;
addEventListener('message', async function (e) {
    const music = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3");
    music.play();   
     if (initilaize == 0) {
        
            console.log('1');
            initilaize += 1;
            console.log('12');
            AudioCC = window.AudioContext || window.webkitAudioContext;
            console.log('123');
            audioContext = new AudioCC();
            console.log('11');
            drumElement = document.querySelector('#mp31')
            console.log('12');
            drumTrack = audioContext.createMediaElementSource(drumElement);
            snareElement = document.querySelector('#mp32')
            snareTrack = audioContext.createMediaElementSource(snareElement);
            console.log('2');
            if (audioContext.state === 'suspended') { //autoplay policy
                audioContext.resume();
            }
            drumTrack.connect(audioContext.destination);
            snareTrack.connect(audioContext.destination);
            console.log("initialization complete!")
     }
    const message = e.data;
    
    //console.log(`[From Main]: ${message}`);
    angle_y = parseInt(message);
    console.log(angle_y);
    if (angle_y > 30) { // TO-DO: check value based on band design
        activated = 1;
    } else if (angle_y < -30) {
        activated = 2;
    } else { //autoplay policy
        console.log(activated);
        //if (audioContext.state === 'suspended') {
        //    audioContext.resume();
        //}
        if (activated == 1) {
            console.log('hear the drum!');
            //console.log("hello");
            //drumElement.play();
            activated = 0;
            //setTimeout(drumLoop, 200); //activate sound

        } else if (activated == 2) {
            console.log('hear the kick');
            //console.log(`[From Main]: hello`);
            //snareElement.play()
            activated = 0;
            //setTimeout(drumLoop, 200); //activate sound

        } else {
            console.log("activated is 0");
        }
    }
});

// self.addEventListener('message', function (e) {
//     angle_y = parseInt(e.data);
//     if (angle_y > 30) { // TO-DO: check value based on band design
//         activated = 1;
//     } else if (angle_y < -30) {
//         activated = 2;
//     } else { //autoplay policy
//         console.log(activated);
//         if (audioContext.state === 'suspended') {
//             audioContext.resume();
//         }
//         if (activated == 1) {
//             drumElement.play();
//             activated = 0;
//             //setTimeout(drumLoop, 200); //activate sound

//         } else if (activated == 2) {
//             snareElement.play()
//             activated = 0;
//             //setTimeout(drumLoop, 200); //activate sound

//         }
//     }

// })




