import React, {Component} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import {getMonth, getYear} from "date-fns";
import moment from "moment";
import DatePicker from "react-datepicker";
import range from "lodash/range";

class EditDobLayout extends Component {

    state = {
        date: '',
        data: {
            dob: ''
        }
    }

    componentDidMount() {
        const {dob} = this.props;
        this.setState({data: {dob}, date: moment(dob).toDate()});
    }

    onChange(date) {
        let dob = moment(date).format('YYYY-MM-DD');
        this.setState({data: {dob}, date});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state.data, type);
    }

    render() {

        const {profileInfoUpdate} = this.props;

        const years = range(1970, getYear(new Date()) + 1, 1);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return <>
            <Form className={`text-left`} onSubmit={this.submit}>
                <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <DatePicker
                        renderCustomHeader={({
                                                 date,
                                                 changeYear,
                                                 changeMonth,
                                                 decreaseMonth,
                                                 increaseMonth,
                                                 prevMonthButtonDisabled,
                                                 nextMonthButtonDisabled
                                             }) => (
                            <div
                                style={{
                                    margin: 10,
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button className={`sm rounded my-pt-1 mr-1`} type={"button"} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                    {"<"}
                                </Button>

                                <Form.Control as="select" size="sm" custom className={`mr-1`}
                                              value={getYear(date)}
                                              onChange={({target: {value}}) => changeYear(value)}
                                >
                                    {years.map((option, index) => (
                                        <option key={`${option}-${index}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>

                                <Form.Control as="select" size="sm" custom
                                              value={months[getMonth(date)]}
                                              onChange={({target: {value}}) =>
                                                  changeMonth(months.indexOf(value))
                                              }
                                >
                                    {months.map((option, index) => (
                                        <option key={`${option}-${index}`} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>

                                <Button className={`sm rounded my-pt-1 ml-1`} type={"button"} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                    {">"}
                                </Button>
                            </div>
                        )}
                        name={`dob`}
                        autoComplete={`off`}
                        selected={this.state.date}
                        dateFormat="yyyy-MM-dd"
                        className={`form-control ${!!profileInfoUpdate.data?.errors?.dob && 'is-invalid'}`}
                        onChange={this.onChange.bind(this)}
                    />
                    <Form.Text className={`text-danger`}>{profileInfoUpdate.data?.errors?.dob}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                    {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                </Button>
            </Form>
        </>;
    }
}

export default EditDobLayout;