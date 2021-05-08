import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";

class EditAddressLayout extends Component {

    state = {
        address: ''
    }

    componentDidMount() {
        const {address} = this.props;
        this.setState({address});
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
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name={`address`} placeholder="Enter address"
                                  isInvalid={!!profileInfoUpdate.data?.errors?.address}
                                  value={this.state.address} onChange={this.onChange.bind(this)} />
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.address}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditAddressLayout;