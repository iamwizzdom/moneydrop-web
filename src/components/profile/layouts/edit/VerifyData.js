import React, {Component} from "react";
import ReactCodeInput from "react-code-input";
import {Button, Form, Spinner} from "react-bootstrap";
import Utility from "../../../../helpers/Utility";
import CountDownTimer from "../../../../helpers/CountDownTimer";

class VerifyData extends Component {

    state = {
        data: {
            code: '',
        },
        countDownFinished: false,
        countDownTime: 0,
        resendElem: null,
    }

    countDownTimer;

    componentDidMount() {
        const {data, oldData, type, countDownTime} = this.props;
        this.setState({data: {[type]: data, [`old_${type}`]: oldData}, countDownTime}, () => {
            this.startCountDown();
        });
    }

    componentWillUnmount() {
        if (this.countDownTimer) this.countDownTimer.cancel();
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({data: {...this.state.data, [name]: value}});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state.data, type);
    }

    resend = (e) => {
        e.preventDefault();
        const {resend, type} = this.props;
        resend({[type]: this.state.data[type]}, type);
    }

    startCountDown() {
        this.countDownTimer = new CountDownTimer(this.state.countDownTime * 1000, 1000);
        this.countDownTimer.setOnTick((millisUntilFinished) => {

            let date = new Date(millisUntilFinished);
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            let resentTxt = Utility.sprintf("%s:%s", (minutes > 9 ? minutes : "0" + minutes), (seconds > 9 ? seconds : "0" + seconds));
            this.setState({resendElem: <>
                <span>Didn't receive OTP? Wait for <span className={`color-accent font-weight-bold`}>{resentTxt}</span></span>
                </>})

        });
        this.countDownTimer.setOnFinish(() => {

            this.setState({countDownFinished: true});
        });
        this.countDownTimer.start();
    }

    render() {
        const {data, type, verifyAuth, verifyRequest} = this.props;

        return <>
            <p className={`text-muted text-left mb-4`}>{Utility.sprintf("Enter the 5 digit OTP we sent your %s at %s", type, data)}</p>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="otp">
                    <ReactCodeInput type='text' fields={5} inputMode={`numeric`} autoComplete={`off`} name={`code`}
                                    onChange={(pin) => this.onChange.call(this, {target: {name: 'code', value: pin}})}/>
                    <Form.Text className={`text-danger`}>{verifyAuth.data?.errors?.code || (!verifyAuth.data.status && verifyAuth.data?.message)}</Form.Text>
                </Form.Group>
                {!this.state.countDownFinished ? this.state.resendElem : <span>Didn't get OTP? <span className={`color-accent font-weight-bold`} onClick={this.resend}>
                        {verifyRequest.requesting ? <Spinner animation="border" variant="warning" size={`sm`}/> : <span className={`cursor-pointer`}>Resend code</span>}
                    </span></span>}
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {verifyAuth.requesting ? <Spinner animation="border" variant="light"/> : 'Verify'}
                </Button>
            </Form>
        </>;
    }
}

export default VerifyData;