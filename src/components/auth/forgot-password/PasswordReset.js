import React, {Component} from "react";
import {connect} from "react-redux";
import logo from "../../../assets/images/logo.svg";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Validator from "../../../helpers/validator";
import {AuthAction} from "../../../actions";

class PasswordReset extends Component {

    state = {
        errors: {
            email: '',
            password: '',
            password_confirmation: '',
        },
        navigate: false,
        mounted: false,
    };

    componentDidMount() {
        this.setState({mounted: true});
        const {state} = this.props.location;
        if (this.props.verifyRequest?.data) this.props.verifyRequest.data = {};
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        let {resetPassword} = this.props;

        if (resetPassword.data?.status && !this.state.navigate) {
            setTimeout(() => {
                this.setState({navigate: true});
            }, 3000);
        }
    }

    submit = (e) => {
        e.preventDefault();

        let validator = new Validator(e);
        if (!this.state.email) validator.validate('email').isEmail("Please enter a valid email address");

        validator.validate('otp').isBlank("Please enter a valid OTP").isNumber("OTP must be numeric")
            .hasMinLength(5, "OTP must be 5 digits").hasMaxLength(5, "OTP must be 5 digits");
        validator.validate('password').hasMinLength(8, "Password must by at least 8 characters");
        validator.validate('password_confirmation').isIdentical(validator.getValue('password'), "Password do not match");

        if (validator.hasError()) {
            this.setState({errors: {...validator.getErrorsFlat()}});
        } else {
            this.setState({errors: {email: '', otp: '', password: '', password_confirmation: ''}});
            const {dispatch} = this.props;
            let email = this.state.email || validator.getValue('email');
            let otp = validator.getValue('otp');
            let password = validator.getValue('password');
            let password_confirmation = validator.getValue('password_confirmation');
            dispatch(AuthAction.resetPassword({email, otp, password, password_confirmation}));
        }

    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({[name]: value})
    };

    render() {

        let {errors, email, mounted} = this.state;
        let {resetPassword} = this.props;

        if (mounted && resetPassword.data?.status === false && resetPassword.data?.errors) {
            errors = {...errors, ...resetPassword.data?.errors};
            resetPassword.data.errors = null;
        }

        let message = null;

        if ((mounted && resetPassword.data?.message)) {
            message = <Alert key={1} variant={resetPassword.data?.status ? `success` : `danger`}>{resetPassword.data.message}</Alert>;
            resetPassword.data.message = null;
        }

        if (this.state.navigate) return <Redirect to={{ pathname: '/login', state: { email } }} />;

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">Please enter the OTP sent to your email to reset your password.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            {!email && <Form.Group controlId="email">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email"
                                              onChange={this.onChange} isInvalid={!!errors.email}/>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>}

                            <Form.Group controlId="otp">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>OTP</Form.Label>
                                <Form.Control type="number" placeholder="Enter OTP" name="otp" onChange={this.onChange} isInvalid={!!errors.otp}/>
                                <Form.Control.Feedback type="invalid">{errors.otp}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label className={`text-dark font-size-14 text-uppercase`}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password"
                                              onChange={this.onChange} isInvalid={!!errors.password}/>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="confirm-password">
                                <Form.Label className={`text-dark font-size-14 text-uppercase`}>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" name="password_confirmation"
                                              onChange={this.onChange} isInvalid={!!errors.password_confirmation}/>
                                <Form.Control.Feedback type="invalid">{errors.password_confirmation}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {resetPassword.requesting ? <Spinner animation="border" variant="light" /> : 'Reset'}
                                </Button>
                            </div>
                            <p className="text-center mt-3 mb-0">Remembered password? <Link to={'/login'} className={`color-accent font-weight-bold`}>Login</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        resetPassword: state.resetPassword
    }
}

export default connect(mapStateToProps)(PasswordReset)