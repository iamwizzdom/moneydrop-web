import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";

class EditAddressLayout extends Component {

    state = {
        address: ''
    }

    componentDidMount() {
        const {address} = this.props;
        this.setState({address}, () => {
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
        return <>
            <h5 className={`mt-2 mb-4 text-left`}>Update Address</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name={`address`} placeholder="Enter address"
                                  value={this.state.address} onChange={this.onChange.bind(this)} />
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditAddressLayout;