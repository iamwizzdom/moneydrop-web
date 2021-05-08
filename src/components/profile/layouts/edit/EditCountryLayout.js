import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import Utility from "../../../../helpers/Utility";
import Country from "../../../../models/Country";

class EditCountryLayout extends Component {

    state = {
        countries: [],
        data: {
            country: '',
        },
        mounted: false
    }

    componentDidMount() {
        const {country} = this.props;
        let countries = localStorage.getItem('countries');
        this.setState({mounted: true, data: {country}, countries: !Utility.isEmpty(countries) ? JSON.parse(countries) : []});
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
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <select className={`form-control custom-select ${!!profileInfoUpdate.data?.errors?.country && 'is-invalid'}`}
                            name={`country`} onChange={this.onChange.bind(this)} defaultValue={this.state.data.country}>
                        <option value="" disabled>Select Country</option>
                        {this.state.countries.map((item, key) => {
                            let country = new Country(item);
                            return <option key={key} value={country.getId()}>{country.getName()}</option>;
                        })}
                    </select>
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.country}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditCountryLayout;