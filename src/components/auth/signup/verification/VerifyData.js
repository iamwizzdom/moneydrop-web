import React, {Component} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import logo from '../../../../assets/images/logo.svg';
import Validator from "../../../../helpers/validator";
import {AuthAction} from "../../../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import CountDownTimer from "../../../../helpers/CountDownTimer";
import Utility from "../../../../helpers/Utility";
import ReactCodeInput from "react-code-input";

class VerifyEmail extends Component {

    state = {
        errors: {
            code: ''
        },
        code: '',
        navigate: false,
        navigateToSignup: false,
        mounted: false,
        countDownFinished: false,
        countDownTime: 0,
        resendElem: null,
    };

    countDownTimer;

    componentDidMount() {
        const {state} = this.props.location;
        if (this.props.verifyAuth?.data) this.props.verifyAuth.data = {};
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        }, () => this.startCountDown());
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        let {email, data, type} = this.state;
        let {verifyAuth, verifyRequest} = this.props;

        if (this.props.verifyRequest.data?.expire) {
            let countDownTime = verifyRequest.data?.expire;
            verifyRequest.data.expire = null;
            this.setState({countDownTime, countDownFinished: false},() => this.startCountDown())
        }

        if (verifyAuth.data?.status === false && verifyAuth.data?.errors) {
            this.setState({errors: verifyAuth.data?.errors});
            verifyAuth.data.errors = null;
        }

        if (verifyAuth.data?.status && email && data && type === 'phone') {
            setTimeout(() => {
                this.setState({navigateToSignup: true});
            }, 2000);
        }

        if (verifyAuth.data?.status && data && type === 'email') {
            setTimeout(() => {
                this.setState({navigate: true});
            }, 2000);
        }
    }

    componentWillUnmount() {
        if (this.countDownTimer) this.countDownTimer.cancel();
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    submit = (e) => {
        e.preventDefault();
        let validator = new Validator(e);
        validator.validate('code').isBlank("Please enter a valid code").isNumber("Code must be numeric")
            .hasMinLength(5, "Code must be 5 digits").hasMaxLength(5, "Code must be 5 digits");

        if (validator.hasError()) {
            this.setState({error: {...validator.getErrorsFlat()}});
        } else {
            this.setState({error: {code: ''}});
            const {dispatch} = this.props;
            let code = validator.getValue('code');
            dispatch(AuthAction.verify({code, [this.state.type]: this.state.data}, this.state.type));
        }

    };

    resend = (e) => {
        e.preventDefault();
        const {data, type} = this.state;
        const {dispatch} = this.props;
        dispatch(AuthAction.verifyRequest({[type]: data}, type));
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

        let {errors, email, data, mounted} = this.state;
        let {verifyAuth, verifyRequest} = this.props;

        if (mounted && !data) return <Redirect to={{ pathname: `/signup/verification/email`, errorMessage: 'Send a verification code first.'}} />;

        if (this.state.navigateToSignup) return <Redirect to={{ pathname: `/signup`, state: {email, phone: data}}} />;

        if (this.state.navigate) return <Redirect to={{ pathname: `/signup/verification/phone`, state: {email: data}}} />;

        let message = null;

        if (mounted && verifyAuth.data?.message) {
            message = <Alert key={1} variant={verifyAuth.data?.status ? `success` : `danger`}>{verifyAuth.data.message}</Alert>;
            // verifyAuth.data.message = null;
        }

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">OTP Verification</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <p className="text-left font-size-14">Enter the 5 digit code we sent to {this.state.data}</p>
                        <Form onSubmit={this.submit}>
                            <Form.Group controlId="otp">
                                <ReactCodeInput type='text' fields={5} inputMode={`numeric`} autoComplete={`off`} name={`code`}
                                                onChange={(pin) => this.onChange.call(this, {target: {name: 'code', value: pin}})}/>
                                <Form.Control type="hidden" name="code" value={this.state.code}/>
                                <Form.Text className={`text-danger font-size-14`}>{errors.code}</Form.Text>
                            </Form.Group>
                            {!this.state.countDownFinished ? this.state.resendElem : <span>Didn't get OTP? <span className={`color-accent font-weight-bold`} onClick={this.resend}>
                            {verifyRequest.requesting ? <Spinner animation="border" variant="warning" size={`sm`}/> : <span className={`cursor-pointer`}>Resend code</span>}
                            </span></span>}
                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {verifyAuth.requesting ? <Spinner animation="border" variant="light" /> : 'Verify'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        verifyRequest: state.verifyRequest,
        verifyAuth: state.verifyAuth,
    }
}

export default connect(mapStateToProps)(VerifyEmail)
