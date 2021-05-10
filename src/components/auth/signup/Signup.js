import React, {Component} from "react";
import {Alert, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import logo from '../../../assets/images/logo.svg';
import {connect} from "react-redux";
import {Link, Redirect} from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import Validator from "../../../helpers/validator";
import {AuthAction} from "../../../actions";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import moment from "moment";

class Signup extends Component {

    state = {
        error: {},
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

        e.target.phone.value = this.state.phone.indexOf('+') > -1 ? this.state.phone : ('+' + this.state.phone);
        e.target.dob.value = this.state.dob;
        let validator = new Validator(e);
        validator.validate('firstname').isBlank("Please enter your first name");
        validator.validate('lastname').isBlank("Please enter your last name");
        validator.validate('email').isEmail("Please enter a valid email");
        validator.validate('phone').isPhoneNumber("Please enter a valid phone number");
        validator.validate('dob').isDate("Please enter a valid date of birth").isDateGrater(
            moment().format('YYYY-MM-DD'), "Sorry, we does not accept people that are born in the future"
        );
        validator.validate('password').hasMinLength(8, "Password must by at least 8 characters");
        validator.validate('password_confirmation').isIdentical(validator.getValue('password'), "Password do not match");

        if (validator.hasError()) {
            this.setState({error: {...validator.getErrorsFlat()}});
        } else {
            let errors = this.state.error;
            for (let n in errors) this.setState({...this.state, ...{error: {[n]: ''}}});
            const {dispatch} = this.props;
            dispatch(AuthAction.signup(validator.getFormObject()));
        }
    };

    render() {

        let {error, email, phone, mounted, errorMessage} = this.state;
        let {auth} = this.props;

        const years = range(1970, getYear(new Date()) + 1, 1);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        if (mounted && !email) {
            return <Redirect to={{
                pathname: `/signup/verification/email`,
                errorMessage: 'You must first verify your email address'
            }}/>;
        }

        if (mounted && !phone) {
            return <Redirect to={{
                pathname: `/signup/verification/phone`,
                errorMessage: 'You must first verify your phone number'
            }}/>;
        }

        if (mounted && auth.data?.status === false && auth.data?.errors) {
            error = {...error, ...auth.data?.errors};
            auth.data.errors = null;
        }

        let message = null;

        if ((mounted && !auth.data?.status && auth.data?.message) || errorMessage) {
            message = <Alert key={1} variant={auth.data?.status ? `success` : `danger`}>{auth.data.message || errorMessage}</Alert>;
            auth.data.message = null;
        }

        if (mounted && auth.data?.status) {
            return <Redirect to={{pathname: '/signup/successful', state: {signup: true, signupMessage: auth.data?.message}}}/>;
        }

        return (
            <>
                <div className="mt-5 mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                    <p className="font-size-22 mt-2 text-center">Create your MoneyDrop account.</p>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5`}>
                        {message}
                        <Form onSubmit={this.submit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="firstname">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>First name</Form.Label>
                                        <Form.Control type="text" placeholder="First name" name="firstname"
                                                      onChange={this.onChange} isInvalid={!!error.firstname}/>
                                        <Form.Control.Feedback type="invalid">{error.firstname}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="lastname">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Last name</Form.Label>
                                        <Form.Control type="text" placeholder="Last name" name="lastname"
                                                      onChange={this.onChange} isInvalid={!!error.lastname}/>
                                        <Form.Control.Feedback type="invalid">{error.lastname}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email"
                                                      value={mounted && email} onChange={this.onChange}
                                                      isInvalid={!!error.email} readOnly={true}/>
                                        <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="phone">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Phone number</Form.Label>
                                        <PhoneInput
                                            country={'ng'}
                                            disableDropdown={!error.phone}
                                            value={phone || this.state.phone}
                                            inputProps={{
                                                name: 'phone',
                                                placeholder: "Enter phone",
                                                readOnly: true
                                            }}
                                            onChange={phone => this.setState({phone})}
                                        />
                                        <Form.Text className={`text-danger`}>{error.phone}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="dob">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Date of Birth</Form.Label>
                                        <DatePicker
                                            renderCustomHeader={({
                                                                     date,
                                                                     changeYear,
                                                                     changeMonth,
                                                                     decreaseMonth,
                                                                     increaseMonth,
                                                                     prevMonthButtonDisabled,
                                                                     nextMonthButtonDisabled
                                                                 }) => (
                                                <div
                                                    style={{
                                                        margin: 10,
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    <Button className={`sm rounded my-pt-1 mr-1`} type={"button"} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                        {"<"}
                                                    </Button>

                                                    <Form.Control as="select" size="sm" custom className={`mr-1`}
                                                                  value={getYear(date)}
                                                                  onChange={({target: {value}}) => changeYear(value)}
                                                    >
                                                        {years.map((option, index) => (
                                                            <option key={`${option}-${index}`} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Form.Control>

                                                    <Form.Control as="select" size="sm" custom
                                                        value={months[getMonth(date)]}
                                                        onChange={({target: {value}}) =>
                                                            changeMonth(months.indexOf(value))
                                                        }
                                                    >
                                                        {months.map((option, index) => (
                                                            <option key={`${option}-${index}`} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Form.Control>

                                                    <Button className={`sm rounded my-pt-1 ml-1`} type={"button"} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        {">"}
                                                    </Button>
                                                </div>
                                            )}
                                            name={`dob`}
                                            selected={this.state.date}
                                            autoComplete={`off`}
                                            dateFormat="yyyy-MM-dd"
                                            className={`form-control`}
                                            onChange={date => {
                                                let dob = moment(date).format('YYYY-MM-DD');
                                                this.setState({dob, date})
                                            }}
                                        />
                                        <Form.Text className={`text-danger`}>{error.dob}</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="password">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" isInvalid={!!error.password}/>
                                        <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="confirm-password">
                                        <Form.Label className={`text-dark font-size-14 text-uppercase`}>Confirm password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm password" name="password_confirmation" isInvalid={!!error.password_confirmation}/>
                                        <Form.Control.Feedback type="invalid">{error.password_confirmation}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="mt-4 text-center">
                                <Button variant="primary" type="submit" size="lg" className={`font-size-16 min-height-55 min-width-55-per text-capitalize`}>
                                    {auth.requesting ? <Spinner animation="border" variant="light"/> : 'Sign up'}
                                </Button>
                            </div>
                            <p className="text-center mt-3 mb-0">Already have an account? <Link to={'/login'} className={`color-accent font-weight-bold`}>Login</Link></p>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.signup
    }
}

export default connect(mapStateToProps)(Signup)