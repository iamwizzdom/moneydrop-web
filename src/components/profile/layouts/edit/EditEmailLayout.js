import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";

class EditEmailLayout extends Component {

    state = {
        email: '',
        old_email: ''
    }

    componentDidMount() {
        const {email} = this.props;
        this.setState({email, old_email: email});
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
        const {verifyRequest} = this.props;
        return <>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name={`email`} placeholder="Enter email"
                                  isInvalid={!!verifyRequest.data?.errors?.email}
                                  value={this.state.email} onChange={this.onChange.bind(this)} />
                    <Form.Text className={`text-danger`}>{verifyRequest.data?.errors?.email}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {verifyRequest.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditEmailLayout;