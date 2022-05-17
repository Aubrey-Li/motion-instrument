import Worker from 'web-worker';
const worker = new Worker('../src/main.js');

let isAppInit = false;
var sinea = null;
var sineb = null;
var sinec = null;
var volume = null;
var delay;
var delayFeedback;
var audioCtx;
var x_val = 0;
var y_val = 0;

window.addEventListener('click', init);

function init() {
    if (isAppInit) {
        return;
    }

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    delay = audioCtx.createDelay(5);
    delay.delayTime.value = 0.09;
    delayFeedback = audioCtx.createGain();
    delayFeedback.gain.value = 0.79;

    volume = audioCtx.createGain();

    sinea = audioCtx.createOscillator();
    sinea.frequency.value = 440;
    sinea.type = "sine";
    sinea.start();
    sinea.connect(volume);

    sineb = audioCtx.createOscillator();
    sineb.frequency.value = 523.25;
    sineb.type = "sine";
    sineb.start();
    sineb.connect(volume);

    sinec = audioCtx.createOscillator();
    sinec.frequency.value = 698.46;
    sinec.type = "sine";
    sinec.start();
    sinec.connect(volume);

    volume.connect(delay);
    volume.connect(audioCtx.destination);
    delayFeedback.connect(volume);
    delay.connect(delayFeedback);
    delayFeedback.connect(delay);

    volume.gain.value = 0.2;
    console.log("got here!");

    isAppInit = true;
}



worker.addEventListener('message', function (e) {
    const msg = e.data;
    console.log(e.data);
    x_val = parseFloat(msg);
    // y_val = parseFloat(msg[1]);
    sinea.frequency.value = (x_val / 1000.0) * 440;
    sineb.frequency.value = (x_val / 1000.0) * 523.25;
    sinec.frequency.value = (x_val / 1000.0) * 698.46;
    delayFeedback.gain.value = Math.max(0.7, x_val / 700.0);
});

const mute = document.querySelector(".mute");

mute.onclick = function () {
    if (mute.getAttribute("data-muted") === "false") {
        volume.disconnect(audioCtx.destination);
        mute.setAttribute("data-muted", "true");
        mute.innerHTML = "Unmute";
    } else {
        volume.connect(audioCtx.destination);
        mute.setAttribute("data-muted", "false");
        mute.innerHTML = "Mute";
    }
};

