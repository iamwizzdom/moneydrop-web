import React, {Component} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import logo from '../../../../assets/images/logo.svg';
import {Link} from "react-router-dom";
import Validator from "../../../../helpers/validator";
import {AuthAction} from "../../../../actions";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';

class VerifyEmail extends Component {

    state = {
        error: {
            email: ''
        },
        navigate: false,
        mounted: false,
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

        let {email, mounted} = this.state;
        let {verifyRequest} = this.props;

        if ((mounted && email) || (mounted && verifyRequest.data?.code === 409)) {
            if ((mounted && verifyRequest.data?.code === 409) && !this.state.navigate) {
                setTimeout(() => {
                    this.setState({navigate: true});
                }, 2000);
            }
        }
    }

    submit = (e) => {
        e.preventDefault();

        let validator = new Validator(e);
        validator.validate('email').isEmail("Please enter a valid email address");

        if (validator.hasError()) {
            this.setState({error: {...validator.getErrorsFlat()}});
        } else {
            this.setState({error: {email: ''}});
            const {dispatch} = this.props;
            let email = validator.getValue('email');
            dispatch(AuthAction.verifyRequest({email}, "email"));
        }

    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({[name]: value})
    };

    render() {

        let {error, mounted, errorMessage} = this.state;
        let {verifyRequest} = this.props;

        if (mounted && verifyRequest.data?.status === false && verifyRequest.data?.errors) {
            error = {...error, ...verifyRequest.data?.errors};
            verifyRequest.data.errors = null;
        }

        let message = null;

        if ((mounted && verifyRequest.data?.message) || errorMessage) {
            message = <Alert key={1} variant={verifyRequest.data?.status ? `success` : `danger`}>{verifyRequest.data.message || errorMessage}</Alert>;
            verifyRequest.data.message = null;
        }

        if (this.state.navigate) return <Redirect to={{ pathname: '/signup/verification/phone', state: { email: this.state.email } }} />;

        if (mounted && verifyRequest.data?.status && verifyRequest.data?.code !== 409) {
            return <Redirect to={{ pathname: '/signup/verification/email/verify', state: { data: verifyRequest.data?.email, countDownTime: verifyRequest.data?.expire, type: 'email' } }} />;
        }

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">Enter you email address, we will send you OTP to verify it.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onChange} isInvalid={!!error.email}/>
                                <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {verifyRequest.requesting ? <Spinner animation="border" variant="light" /> : 'Start using'}
                                </Button>
                            </div>
                            <p className="text-center mt-3 mb-0">Already have an account? <Link to={'/login'} className={`color-accent font-weight-bold`}>Login</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
                <div className={`w-100 text-center mt-5`}>
                    <p className={`m-0`}>By clicking start you agree to our</p>
                    <Link to={'/sign-up'} className={`color-accent`}>Privacy Policy and Terms</Link>
                </div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        verifyRequest: state.verifyRequest
    }
}

export default connect(mapStateToProps)(VerifyEmail)