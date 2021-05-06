import React, {Component} from "react";
import ReactCodeInput from "react-code-input";
import {Form} from "react-bootstrap";
import swal from "@sweetalert/with-react";
import Utility from "../../../../helpers/Utility";

class VerifyData extends Component {

    state = {
        code: '',
    }

    componentDidMount() {
        const {data, oldData, type} = this.props;
        this.setState({[type]: data, [`old_${type}`]: oldData}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify(this.state));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(JSON.stringify(this.state));
        });
    }

    render() {
        const {data, type} = this.props;
        return <>
            <h5 className={`mt-2 text-left`}>Verification</h5>
            <p className={`text-muted text-left mb-4`}>{Utility.sprintf("Enter the 5 digit OTP we sent your %s at %s", type, data)}</p>
            <Form className={`text-left`} autoComplete={`off`}>
                <Form.Group controlId="otp">
                    <ReactCodeInput type='text' fields={5} inputMode={`numeric`} name={`code`} onChange={(pin) => this.onChange.call(this, {target: {name: 'code', value: pin}})}/>
                </Form.Group>
            </Form>
        </>;
    }
}

export default VerifyData;