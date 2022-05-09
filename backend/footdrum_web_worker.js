// Importing the required modules
console.clear();
const playButton = document.querySelector('button');
console.log("playbutton", playButton);
var drumstate = 0;
var initilaize = 0;
var audioContext = null;
var drumElement = null;
var drumTrack = null;
var snareTrack = null;
var AudioCC = null;
playButton.addEventListener('click', drumHandler);

    
function drumHandler() {
    if (initilaize == 0) {
        initilaize += 1;
        AudioCC = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioCC();
        drumElement = document.querySelector('#mp31')
        drumTrack = audioContext.createMediaElementSource(drumElement);
        snareElement = document.querySelector('#mp32')
        snareTrack = audioContext.createMediaElementSource(snareElement);
        if (audioContext.state === 'suspended') { //autoplay policy
                audioContext.resume();
        }
        drumTrack.connect(audioContext.destination);
        snareTrack.connect(audioContext.destination);
        console.log("initialization complete!")
    }
    
    //TO-DO: make a working switch instrument mechanism
    
//    if (drumstate == 1) {
//        drumstate = 0;
//        return;
//    }
    //call drum loop
}

    
var activated = 0;
self.addEventListener('message', function(e) {
        int angle_y = parseInt(e.data);
        if (angle_y > 30) { // TO-DO: check value based on band design
            activated = 1;
        } else if (angle_y < -30) {
            activated = 2;
        } else { //autoplay policy
            console.log(activated);
            if (audioContext.state === 'suspended') {
                    audioContext.resume();                
            }
            if (activated == 1) {
                drumElement.play();
                activated = 0;
                //setTimeout(drumLoop, 200); //activate sound
     
            } else if (activated == 2) {
                snareElement.play()
                activated = 0;
                //setTimeout(drumLoop, 200); //activate sound
        
            }
        }
    
}



   
