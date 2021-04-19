import React, {Component} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import logo from '../../../../assets/images/logo.svg';
import Validator from "../../../../helpers/validator";
import {AuthAction} from "../../../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class VerifyEmail extends Component {

    state = {
        error: {
            code: ''
        },
        navigate: false,
        mounted: false
    };

    componentDidMount() {
        const {state} = this.props.location;
        if (this.props.auth?.data) this.props.auth.data = {};
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
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

    render() {

        let {error, email, data, type, mounted} = this.state;
        let {auth} = this.props;

        if (mounted && !data) return <Redirect to={{ pathname: `/signup/verification/email`, errorMessage: 'Send a verification code first.'}} />;


        if (mounted && auth.data?.status && email && data && type === 'phone') {
            setTimeout(() => {
                this.setState({navigate: true});
            }, 3000);
            if (this.state.navigate) return <Redirect to={{ pathname: `/signup`, state: {email, phone: data}}} />;
        }

        if (mounted && auth.data?.status && data && type === 'email') return <Redirect to={{ pathname: `/signup/verification/phone`, state: {email: data}}} />;

        if (mounted && auth.data?.status === false && auth.data?.errors) {
            error = {...error, ...auth.data?.errors};
            auth.data.errors = null;
        }

        let message = null;

        if (mounted && auth.data?.message) {
            message = <Alert key={1} variant={auth.data?.status ? `success` : `danger`}>{auth.data.message}</Alert>;
            auth.data.message = null;
        }

        return (
            <>
                <div className="mb-5 text-center">
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
                                <Form.Control type="number" placeholder="Enter OTP" name="code" isInvalid={!!error.code}/>
                                <Form.Control.Feedback type="invalid">{error.code}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-60 w-100 text-uppercase`}>
                                    {auth.requesting ? <Spinner animation="border" variant="light" /> : 'Verify'}
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

export default connect(mapStateToProps)(VerifyEmail)