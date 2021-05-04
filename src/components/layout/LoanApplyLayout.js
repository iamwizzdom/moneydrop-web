import React, {Component} from "react";
import loanApplyAnim from "../../assets/raw/lottie-loan-apply.json";
import {Player} from "@lottiefiles/react-lottie-player";
import {Form, FormControl} from "react-bootstrap";
import swal from "@sweetalert/with-react";

class LoanApplyLayout extends Component {

    state = {
        amount: '',
        lottie: null
    }

    player = null;

    componentDidMount() {
        this.player = React.createRef();
        this.setState({amount: this.props.amount}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify(this.state));
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        let {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(JSON.stringify(this.state));
        });
    }

    stop() {
        this.player.current.stop();
        this.state.lottie.destroy();
    }

    render() {

        return <>
            <Player
                lottieRef={instance => {
                    this.setState({ lottie: instance });
                }}
                ref={this.player} // set the ref to your class instance
                autoplay={true}
                loop={true}
                src={loanApplyAnim}
                style={{ height: '200px', width: '200px' }}
            />
            <p className={`mt-2 mb-4 color-accent`}>Are you sure you want to apply for this loan?</p>
            <Form>
                <FormControl
                    type={`number`}
                    placeholder="Enter Amount"
                    className={`custom-input-amount`}
                    name={`amount`}
                    value={this.state.amount}
                    onChange={this.onChange.bind(this)}
                    disabled
                />
                <Form.Group className={`mt-3 text-left`} controlId="note">
                    <Form.Label>Note (optional)</Form.Label>
                    <Form.Control as={`textarea`} rows={3} className={`mt-1`} placeholder={`Enter Note`}
                                  name={`note`} value={this.state.note} onChange={this.onChange.bind(this)}/>
                </Form.Group>
            </Form>
        </>;
    }
}

export default LoanApplyLayout;