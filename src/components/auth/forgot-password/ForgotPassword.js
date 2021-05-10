import React, {Component} from "react";
import {connect} from "react-redux";
import logo from "../../../assets/images/logo.svg";
import {Alert, Button, Card, Form, Spinner} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Validator from "../../../helpers/validator";
import {AuthAction} from "../../../actions";

class ForgotPassword extends Component {

    state = {
        errors: {
            email: ''
        },
        navigate: false,
        mounted: false,
    };

    componentDidMount() {
        if (this.props.forgotPassword?.data) this.props.forgotPassword.data = {};
        this.setState({mounted: true});
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        let {forgotPassword} = this.props;

        if (forgotPassword.data?.status && !this.state.navigate && (forgotPassword.data?.code === 200 || forgotPassword.data?.code === 409)) {
            setTimeout(() => {
                this.setState({navigate: true});
            }, 3000);
        }
    }

    submit = (e) => {
        e.preventDefault();

        let validator = new Validator(e);
        validator.validate('email').isEmail("Please enter a valid email address");

        if (validator.hasError()) {
            this.setState({errors: {...validator.getErrorsFlat()}});
        } else {
            this.setState({errors: {email: ''}});
            const {dispatch} = this.props;
            let email = validator.getValue('email');
            dispatch(AuthAction.forgotPassword(email));
        }

    };

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({[name]: value})
    };

    render() {

        let {errors, email, mounted} = this.state;
        let {forgotPassword} = this.props;

        if (mounted && forgotPassword.data?.status === false && forgotPassword.data?.errors) {
            errors = {...errors, ...forgotPassword.data?.errors};
            forgotPassword.data.errors = null;
        }

        let message = null;

        if ((mounted && forgotPassword.data?.message)) {
            message = <Alert key={1} variant={forgotPassword.data?.status ? `success` : `danger`}>{forgotPassword.data.message}</Alert>;
            forgotPassword.data.message = null;
        }

        if (this.state.navigate) return <Redirect to={{ pathname: '/password-reset', state: { email } }} />;

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">Please enter your details to reset your password.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={`text-dark font-size-16 text-uppercase`}>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onChange} isInvalid={!!errors.email}/>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 w-100 text-uppercase`}>
                                    {forgotPassword.requesting ? <Spinner animation="border" variant="light" /> : 'Send OTP'}
                                </Button>
                            </div>
                            <Link to={{pathname: '/password-reset'}} className={`color-accent font-weight-bold d-block mt-3 text-center`}>Already have a code?</Link>
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
        forgotPassword: state.forgotPassword
    }
}

export default connect(mapStateToProps)(ForgotPassword)