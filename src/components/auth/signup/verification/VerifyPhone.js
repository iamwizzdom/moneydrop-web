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
        if (this.props.auth?.data) this.props.auth.data = {};
        this.setState({
            ...this.state,
            errorMessage,
            ...state,
            mounted: true
        });
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
            dispatch(AuthAction.verifyRequest(phone, "phone"));
        }
    };

    render() {

        let {error, email, phone, mounted, errorMessage} = this.state;
        let {auth} = this.props;

        if (mounted && !email) {
            return <Redirect to={{ pathname: `/signup/verification/email`, errorMessage: 'You must first verify your email address'}} />;
        }

        if (mounted && auth.data?.status === false && auth.data?.errors) {
            error = {...error, ...auth.data?.errors};
            auth.data.errors = null;
        }

        let message = null;

        if ((mounted && auth.data?.message) || errorMessage) {
            message = <Alert key={1} variant={auth.data?.status ? `success` : `danger`}>{auth.data.message || errorMessage}</Alert>;
            auth.data.message = null;
        }

        if ((mounted && email && phone) || (mounted && auth.data?.code === 409)) {
            if ((mounted && auth.data?.code === 409) && !this.state.navigate) {
                setTimeout(() => {
                    this.setState({navigate: true});
                }, 3000);
            }
            if (this.state.navigate) return <Redirect to={{ pathname: '/signup', state: { phone: this.state.phone, email } }} />;
        }

        if (mounted && auth.data?.status && auth.data?.code !== 409) {
            return <Redirect to={{ pathname: '/signup/verification/phone/verify', state: { data: auth.data?.phone, email, type: 'phone' } }} />;
        }

        return (
            <>
                <div className="mb-5 text-center">
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
                                    className={`form-control min-height-60`}
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
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-60 w-100 text-uppercase`}>
                                    {auth.requesting ? <Spinner animation="border" variant="light" /> : 'Send'}
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
        auth: state.auth
    }
}

export default connect(mapStateToProps)(VerifyPhone)