import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import Utility from "../../../../helpers/Utility";
import State from "../../../../models/State";

class EditCountryLayout extends Component {

    state = {
        states: [],
        data: {
            state: '',
        },
        mounted: false
    }

    componentDidMount() {
        const {state} = this.props;
        let states = localStorage.getItem('states');
        this.setState({mounted: true, data: {state}, states: !Utility.isEmpty(states) ? JSON.parse(states) : []});
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({data: {[name]: value}});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state.data, type);
    }

    render() {

        const {profileInfoUpdate} = this.props;

        if (!this.state.mounted) return null;

        return <>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <select className={`form-control custom-select ${!!profileInfoUpdate.data?.errors?.state && 'is-invalid'}`}
                            name={`state`} onChange={this.onChange.bind(this)} defaultValue={this.state.data.state}>
                        <option value="" disabled>Select Country</option>
                        {this.state.states.map((item, key) => {
                            let state = new State(item);
                            return <option key={key} value={state.getId()}>{state.getName()}</option>;
                        })}
                    </select>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.state}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditCountryLayout;