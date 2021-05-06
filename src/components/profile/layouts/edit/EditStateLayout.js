import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";
import Utility from "../../../../helpers/Utility";
import Country from "../../../../models/Country";
import State from "../../../../models/State";

class EditCountryLayout extends Component {

    state = {
        states: [],
        state: '',
        mounted: false
    }

    componentDidMount() {
        const {state, country} = this.props;
        let states = localStorage.getItem('states');
        states = (!Utility.isEmpty(states) ? JSON.parse(states) : []).filter((state) => state.country_id === country);
        this.setState({mounted: true, state, states}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify({state: this.state.state}));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(JSON.stringify({state: this.state.state}));
        });
    }

    render() {

        if (!this.state.mounted) return null;

        return <>
            <h5 className={`mt-2 mb-4 text-left`}>Update State</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <select className="custom-select" name={`state`} onChange={this.onChange.bind(this)} defaultValue={this.state.state}>
                        <option value="" disabled>Select Country</option>
                        {this.state.states.map((item, key) => {
                            let state = new State(item);
                            return <option key={key} value={state.getId()}>{state.getName()}</option>;
                        })}
                    </select>
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditCountryLayout;