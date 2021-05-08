import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

class EditPhoneLayout extends Component {

    state = {
        phone: '',
        old_phone: ''
    }

    componentDidMount() {
        const {phone} = this.props;
        this.setState({phone, old_phone: phone});
    }

    onChange(e) {
        e.target.value = e.target.value.indexOf('+') > -1 ? e.target.value : ('+' + e.target.value);
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state, type);
    }

    render() {
        const {verifyRequest} = this.props;
        return <>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <PhoneInput
                        className={`form-control min-height-55 ${!!verifyRequest.data?.errors?.phone && 'is-invalid'}`}
                        name={`phone`}
                        placeholder={`Enter phone`}
                        country="NG"
                        defaultCountry="NG"
                        value={this.state.phone}
                        onChange={phone => {
                            this.onChange.call(this, {target: {name: 'phone', value: phone ? phone : ''}});
                        }}
                    />
                    <Form.Text className={`text-danger`}>{verifyRequest.data?.errors?.phone}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {verifyRequest.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditPhoneLayout;