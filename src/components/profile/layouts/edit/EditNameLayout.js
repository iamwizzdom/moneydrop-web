import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";

class EditNameLayout extends Component {

    state = {
        firstname: '',
        middlename: '',
        lastname: ''
    }

    componentDidMount() {
        const {firstname, middlename, lastname} = this.props;
        this.setState({firstname, middlename, lastname}, () => {
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
            <h5 className={`mt-2 mb-4 text-left`}>Update Name</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="firstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name={`firstname`} placeholder="Enter firstname"
                                  value={this.state.firstname} onChange={this.onChange.bind(this)} />
                </Form.Group>
                <Form.Group controlId="middlename">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control type="text" name={`middlename`} placeholder="Enter middlename"
                                  value={this.state.middlename} onChange={this.onChange.bind(this)}/>
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name={`lastname`} placeholder="Enter lastname"
                                  value={this.state.lastname} onChange={this.onChange.bind(this)}/>
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditNameLayout;