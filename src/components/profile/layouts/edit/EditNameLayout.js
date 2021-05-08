import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";

class EditNameLayout extends Component {

    state = {
        firstname: '',
        middlename: '',
        lastname: ''
    }

    componentDidMount() {
        const {firstname, middlename, lastname} = this.props;
        this.setState({firstname, middlename, lastname});
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state, type);
    }

    render() {
        const {profileInfoUpdate} = this.props;
        return <>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="firstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name={`firstname`} placeholder="Enter first name"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.firstname}
                                  value={this.state.firstname} onChange={this.onChange.bind(this)} />
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.firstname}</Form.Text>
                </Form.Group>
                <Form.Group controlId="middlename">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control type="text" name={`middlename`} placeholder="Enter middle name"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.middlename}
                                  value={this.state.middlename} onChange={this.onChange.bind(this)}/>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.middlename}</Form.Text>
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name={`lastname`} placeholder="Enter last name"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.lastname}
                                  value={this.state.lastname} onChange={this.onChange.bind(this)}/>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.lastname}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditNameLayout;