function violinHandler(x_val, y_val) {
    sinea.frequency.value = (x_val / 1000.0) * 440 + 400;
    sineb.frequency.value = (x_val / 1000.0) * 523.25 + 400;
    sinec.frequency.value = (x_val / 1000.0) * 698.46 + 400;
    delayFeedback.gain.value = Math.max(0.7, y_val / 700.0);
}