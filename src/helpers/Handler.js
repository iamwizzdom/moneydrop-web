class Handler {

    runnable;
    delay;
    timer;

    constructor(runnable, delay) {
        this.runnable = runnable;
        this.delay = delay;
    }

    stop() {
        if (this.timer) clearTimeout(this.timer);
    }

    start(delay) {
        this.timer = setTimeout(this.runnable, this.delay || delay);
    }
}

export default Handler;