import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";

class ChangePasswordLayout extends Component {

    state = {
        current_password: '',
        password: '',
        password_confirmation: ''
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
                <Form.Group controlId="current_password">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" name={`current_password`} placeholder="Enter current password"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.current_password}
                                  value={this.state.current_password} onChange={this.onChange.bind(this)} />
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.current_password}</Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Create new password</Form.Label>
                    <Form.Control type="password" name={`password`} placeholder="Enter new password"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.password}
                                  value={this.state.password} onChange={this.onChange.bind(this)}/>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.password}</Form.Text>
                </Form.Group>
                <Form.Group controlId="password_confirmation">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="password" name={`password_confirmation`} placeholder="Enter re-type password"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.password_confirmation}
                                  value={this.state.password_confirmation} onChange={this.onChange.bind(this)}/>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.password_confirmation}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default ChangePasswordLayout;