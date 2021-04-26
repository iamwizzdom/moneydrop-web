import {Component} from "react";
import swal from "@sweetalert/with-react";
import {FormControl} from "react-bootstrap";

class InputAmount extends Component {

    state = {
        amount: ''
    }

    changeAmount(e) {
        let amount = e.target.value;
        this.setState({amount});
        swal.setActionValue(amount);
    }

    render() {
        return <FormControl
            type={`number`}
            placeholder="Enter Amount"
            className={`custom-input-amount`}
            value={this.state.amount}
            onChange={this.changeAmount.bind(this)}
        />;
    }
}

export default InputAmount;