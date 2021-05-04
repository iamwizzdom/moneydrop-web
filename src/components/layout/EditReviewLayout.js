import React, {Component} from "react";
import writingAnim from "../../assets/raw/writing.json";
import {Player} from "@lottiefiles/react-lottie-player";
import {Form} from "react-bootstrap";
import swal from "@sweetalert/with-react";

class EditReviewLayout extends Component {

    state = {
        lottie: null,
        review: ''
    }

    componentDidMount() {
        this.player = React.createRef();
        this.setState({review: this.props.review}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(this.state.review);
                clearTimeout(tm);
            }, 500);
        });
    }

    onChange(e) {
        let {name, value} = e.target;
        this.setState({[name]: value}, () => {
            swal.setActionValue(value);
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
                src={writingAnim}
                style={{ height: '200px', width: '200px' }}
            />
            <p className={`mt-2 mb-4 color-accent`}>Edit Review</p>
            <Form>
                <Form.Group className={`mt-3 text-left`} controlId="note">
                    <Form.Control as={`textarea`} rows={4} className={`mt-1`} placeholder={`Enter your review`}
                                  name={`review`} value={this.state.review} onChange={this.onChange.bind(this)}/>
                </Form.Group>
            </Form>
        </>;
    }
}

export default EditReviewLayout;