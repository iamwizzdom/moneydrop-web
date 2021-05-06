import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";

class EditEmailLayout extends Component {

    state = {
        email: '',
        old_email: '',
    }

    componentDidMount() {
        const {email} = this.props;
        this.setState({email, old_email: email}, () => {
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
            <h5 className={`mt-2 mb-4 text-left`}>Update Email</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name={`email`} placeholder="Enter email"
                                  value={this.state.email} onChange={this.onChange.bind(this)} />
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditEmailLayout;