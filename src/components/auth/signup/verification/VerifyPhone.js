import React, {Component} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import logo from '../../../../assets/images/logo.svg';
import Validator from "../../../../helpers/validator";
import {AuthAction} from "../../../../actions";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2'
import PhoneInput from 'react-phone-number-input'
import {parsePhoneNumber} from 'react-phone-number-input'
// import 'react-phone-input-2/lib/style.css'
import 'react-phone-number-input/style.css'

class VerifyPhone extends Component {

    state = {
        error: {
            phone: ''
        },
        navigate: false,
        mounted: false
    };

    componentDidMount() {
        const {errorMessage, state} = this.props.location;
        if (this.props.verifyRequest?.data) this.props.verifyRequest.data = {};
        this.setState({
            ...this.state,
            errorMessage,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        let {email, phone, mounted} = this.state;
        let {verifyRequest} = this.props;

        if ((mounted && email && phone) || (mounted && verifyRequest.data?.code === 409)) {
            if ((mounted && verifyRequest.data?.code === 409) && !this.state.navigate) {
                setTimeout(() => {
                    this.setState({navigate: true});
                }, 2000);
            }
        }
    }

    submit = (e) => {
        e.preventDefault();

        e.target.phone.value = this.state.phone.indexOf('+') > -1 ? this.state.phone : '+' + this.state.phone;
        let validator = new Validator(e);
        validator.validate('phone').isPhoneNumber("Please enter a valid phone number");
        const phoneNumber = parsePhoneNumber(validator.getValue('phone'))
        if (phoneNumber && phoneNumber.country !== 'NG') {
            validator.addError('phone', "Sorry, we only support nigerian phone numbers for now.");
        }

        if (validator.hasError()) {
            this.setState({error: {...validator.getErrorsFlat()}});
        } else {
            this.setState({error: {phone: ''}});
            const {dispatch} = this.props;
            let phone = validator.getValue('phone');
            dispatch(AuthAction.verifyRequest({phone}, "phone"));
        }
    };

    render() {

        let {error, email, mounted, errorMessage} = this.state;
        let {verifyRequest} = this.props;

        if (mounted && !email) {
            return <Redirect to={{ pathname: `/signup/verification/email`, errorMessage: 'You must first verify your email address'}} />;
        }

        if (mounted && verifyRequest.data?.status === false && verifyRequest.data?.errors) {
            error = {...error, ...verifyRequest.data?.errors};
            verifyRequest.data.errors = null;
        }

        let message = null;

        if ((mounted && verifyRequest.data?.message) || errorMessage) {
            message = <Alert key={1} variant={verifyRequest.data?.status ? `success` : `danger`}>{verifyRequest.data.message || errorMessage}</Alert>;
            verifyRequest.data.message = null;
        }

        if (this.state.navigate) return <Redirect to={{ pathname: '/signup', state: { phone: this.state.phone, email } }} />;

        if (mounted && verifyRequest.data?.status && verifyRequest.data?.code !== 409) {
            return <Redirect to={{ pathname: '/signup/verification/phone/verify', state: { data: verifyRequest.data?.phone, countDownTime: verifyRequest.data?.expire, email, type: 'phone' } }} />;
        }

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">Enter you phone number, we will send you OTP to verify it.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            <Form.Group controlId="phone">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Phone number</Form.Label>
                                <PhoneInput
                                    className={`form-control min-height-55`}
                                    name={`phone`}
                                    placeholder={`Enter phone`}
                                    country="NG"
                                    defaultCountry="NG"
                                    value={this.state.phone}
                                    onChange={phone => {
                                        this.setState({phone : phone ? phone : ''})
                                    }}
                                />
                                <Form.Text className={`text-danger`}>{error.phone}</Form.Text>
                            </Form.Group>
                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {verifyRequest.requesting ? <Spinner animation="border" variant="light" /> : 'Send'}
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
        verifyRequest: state.verifyRequest
    }
}

export default connect(mapStateToProps)(VerifyPhone)