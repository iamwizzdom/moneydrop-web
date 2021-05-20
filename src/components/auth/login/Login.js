import React, {Component} from "react";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import logo from '../../../assets/images/logo.svg';
import googleLogo from '../../../assets/images/google-glass-logo.svg';
import {Link, Redirect} from "react-router-dom";
import Validator from "../../../helpers/validator";
import {AuthAction} from "../../../actions";
import {connect} from "react-redux";
import GoogleLogin, {useGoogleLogout} from "react-google-login";
import {AppConst} from "../../../constants";
import * as ReactDOM from "react-dom";

class Login extends Component {

    state = {
        error: {
            email: '',
            password: ''
        }
    };

    submit = (e) => {
        e.preventDefault();

        let validator = new Validator(e);
        validator.validate('email').isEmail("Please enter a valid email address");
        validator.validate('password').isBlank("Please enter your password")
            .hasMinLength(8, "Your password must be at least 8 characters.");

        if (validator.hasError()) {
            this.setState({error: {...validator.getErrorsFlat()}});
        } else {
            this.setState({error: {email: '', password: ''}});
            const {dispatch} = this.props;
            let email = validator.getValue('email');
            let password = validator.getValue('password');
            dispatch(AuthAction.login(email, password));
        }

    };

    responseGoogle = (response) => {
        if (response && response.error) {
            console.log(response);
            return;
        }
        const {dispatch} = this.props;
        const {email, googleId} = response.profileObj;
        dispatch(AuthAction.loginWithGoogle({email, google_id: googleId, token_id: response.tokenId}));
    }

    render() {

        let {error} = this.state;
        const {loginAuth, loginWithGoogleAuth, location} = this.props;
        let errorMessage = location?.errorMessage;
        if (errorMessage) location.errorMessage = null;

        if (loginAuth.data?.status) return <Redirect to={{pathname: `/`, header: {status: 'success', message: loginAuth.data.message}}}/>;

        if (loginWithGoogleAuth.data?.status) {
            return <Redirect to={{pathname: `/`, header: {status: 'success', message: loginAuth.data.message}}}/>;
        }

        if (loginAuth.data?.status === false && loginAuth.data?.errors) {
            error = {...error, ...loginAuth.data?.errors};
            loginAuth.data.errors = null;
        }

        if (loginWithGoogleAuth.data?.status === false && loginWithGoogleAuth.data?.errors) {
            error = {...error, ...loginWithGoogleAuth.data?.errors};
            loginWithGoogleAuth.data.errors = null;
        }

        let message = null;

        if (errorMessage || loginAuth.data?.message) {
            message = <Alert key={1} variant={loginAuth.data?.status ? `success` : `danger`}>{errorMessage || loginAuth.data.message}</Alert>;
            loginAuth.data.message = null;
        } else if (loginWithGoogleAuth.data?.message) {
            message = <Alert key={1} variant={loginWithGoogleAuth.data?.status ? `success` : `danger`}>{loginWithGoogleAuth.data.message}</Alert>;
            loginWithGoogleAuth.data.message = null;
        }

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2">Login to your account.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" isInvalid={!!error.email}/>
                                <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mt-4">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" isInvalid={!!error.password}/>
                                <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="forgot-password" className="mt-3">
                                <Form.Text>
                                    <Link className="text-muted font-size-15 text-decoration-none" to={'/forgot-password'}>Forgot Password?</Link>
                                </Form.Text>
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {loginAuth.requesting ? <Spinner animation="border" variant="light" /> : 'Login'}
                                </Button>
                            </div>

                            <div className="mt-4">
                                <GoogleLogin
                                    clientId={AppConst.GOOGLE_CLIENT_ID}
                                    render={renderProps => (
                                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="outline-primary"
                                                type="submit" size="lg" className={`font-size-16 color-accent min-height-55 w-100 text-uppercase google-sign-in-btn`}>
                                            {loginWithGoogleAuth.requesting ? <Spinner animation="border" variant="warning" /> : <><img src={googleLogo} style={{marginTop: "-5px"}} className={`img-fluid mr-2`} alt={`google-logo`}/>Sign in with Google</>}
                                        </Button>
                                    )}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    redirectUri={`/login`}
                                />
                            </div>
                            <p className="text-center mt-3 mb-0">Don't have an account? <Link to={'/signup/verification/email'} className={`color-accent font-weight-bold`}>Signup</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        loginAuth: state.loginAuth,
        loginWithGoogleAuth: state.loginWithGoogleAuth,
    }
}

export default connect(mapStateToProps)(Login)