import Handler from "./Handler";

class CountDownTimer {

    /**
     * Millis since epoch when alarm should stop.
     */
    mMillisInFuture;

    /**
     * The interval in millis that the user receives callbacks
     */
    mCountdownInterval;

    mStopTimeInFuture;

    /**
     * boolean representing if the timer was cancelled
     */
    mCancelled = false;

    /**
     * This timeout instance
     */
    mHandler = new Handler(() => {

        this.mHandler.stop();

        if (this.mCancelled) return;

        let millisLeft = (this.mStopTimeInFuture - this.elapsedRealtime());

        if (millisLeft <= 0) this.onFinish();
        else {
            let lastTickStart = this.elapsedRealtime();
            this.onTick(millisLeft);

            let lastTickDuration = (this.elapsedRealtime() - lastTickStart);
            let delay;

            if (millisLeft < this.mCountdownInterval) {
                // just delay until done
                delay = millisLeft - lastTickDuration;

                // special case: user's onTick took more than interval to
                // complete, trigger onFinish without delay
                if (delay < 0) delay = 0;
            } else {
                delay = this.mCountdownInterval - lastTickDuration;

                // special case: user's onTick took more than interval to
                // complete, skip to next interval
                while (delay < 0) delay += this.mCountdownInterval;
            }

            this.mHandler.start(delay);
        }

    });

    onTickCallback;

    onFinishCallback;

    startTime = 0;

    constructor(millisInFuture, countDownInterval) {
        this.mMillisInFuture = millisInFuture;
        this.mCountdownInterval = countDownInterval;
        this.startTime = (new Date()).getTime();
    }

    cancel() {
        this.mCancelled = true;
        this.mHandler.stop();
    }

    start() {
        this.mCancelled = false;
        if (this.mMillisInFuture <= 0) {
            this.onFinish();
            return this;
        }
        this.mStopTimeInFuture = (this.elapsedRealtime() + this.mMillisInFuture);
        this.mHandler.start(0)
        return this;
    }

    setOnTick(onTickCallback) {
        this.onTickCallback = onTickCallback;
    }

    onTick(millisUntilFinished) {
        if (this.onTickCallback) this.onTickCallback(millisUntilFinished);
    }

    setOnFinish(onFinishCallback) {
        this.onFinishCallback = onFinishCallback;
    }

    onFinish() {
        if (this.onFinishCallback) this.onFinishCallback();
    }

    elapsedRealtime = () => ((new Date()).getTime() - this.startTime);

}

export default CountDownTimer;