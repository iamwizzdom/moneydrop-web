import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Form} from "react-bootstrap";
import Utility from "../../../../helpers/Utility";
import Country from "../../../../models/Country";

class EditCountryLayout extends Component {

    state = {
        countries: [],
        country: '',
        mounted: false
    }

    componentDidMount() {
        const {country} = this.props;
        let countries = localStorage.getItem('countries');
        this.setState({mounted: true, country, countries: !Utility.isEmpty(countries) ? JSON.parse(countries) : []}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify({country: this.state.country}));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(JSON.stringify({country: this.state.country}));
        });
    }

    render() {

        if (!this.state.mounted) return null;

        return <>
            <h5 className={`mt-2 mb-4 text-left`}>Update Country</h5>
            <Form className={`text-left`}>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <select className="custom-select" name={`country`} onChange={this.onChange.bind(this)} defaultValue={this.state.country}>
                        <option value="" disabled>Select Country</option>
                        {this.state.countries.map((item, key) => {
                            let country = new Country(item);
                            return <option key={key} value={country.getId()}>{country.getName()}</option>;
                        })}
                    </select>
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditCountryLayout;