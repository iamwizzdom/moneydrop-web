import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

class EditPhoneLayout extends Component {

    state = {
        phone: '',
        old_phone: '',
    }

    componentDidMount() {
        const {phone} = this.props;
        this.setState({phone, old_phone: phone}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify(this.state));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        e.target.value = e.target.value.indexOf('+') > -1 ? e.target.value : ('+' + e.target.value);
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(JSON.stringify(this.state));
        });
    }

    render() {
        return <>
            <h5 className={`mt-2 mb-4 text-left`}>Update Phone</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <PhoneInput
                        className={`form-control min-height-60`}
                        name={`phone`}
                        placeholder={`Enter phone`}
                        country="NG"
                        defaultCountry="NG"
                        value={this.state.phone}
                        onChange={phone => {
                            this.onChange.call(this, {target: {name: 'phone', value: phone ? phone : ''}});
                        }}
                    />
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditPhoneLayout;