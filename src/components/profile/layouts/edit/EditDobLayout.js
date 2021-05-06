import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Button, Form} from "react-bootstrap";
import {getMonth, getYear} from "date-fns";
import moment from "moment";
import DatePicker from "react-datepicker";
import range from "lodash/range";

class EditDobLayout extends Component {

    state = {
        date: '',
        dob: ''
    }

    componentDidMount() {
        const {dob} = this.props;
        this.setState({dob, date: moment(dob).toDate()}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify({dob: this.state.dob}));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(date) {
        let dob = moment(date).format('YYYY-MM-DD');
        this.setState({dob, date}, () => {
            swal.setActionValue(JSON.stringify({dob: this.state.dob}));
        });
    }

    render() {

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
            <h5 className={`mt-2 mb-4 text-left`}>Update Date of Birth</h5>
            <Form className={`text-left`}>
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
                        className={`form-control`}
                        onChange={this.onChange.bind(this)}
                    />
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditDobLayout;