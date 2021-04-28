import React, {Component} from "react";
import {Button, Card, Col, Modal, Row, Spinner} from "react-bootstrap";
import logo from '../../../assets/images/logo.svg';
import success from '../../../assets/images/success.svg';
import male from '../../../assets/images/male-icon.svg';
import female from '../../../assets/images/female-icon.svg';
import checkmark from '../../../assets/images/checkmark.svg';
import {AuthAction} from "../../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppConst} from "../../../constants";

class SignupSuccessful extends Component {

    state = {
        error: {
            gender: ''
        },
        navigate: false,
        mounted: false,
        modalShow: false,
        gender: 0
    };

    componentDidMount() {
        const {state} = this.props.location;
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    setModalShow = (status) => {
        this.setState({modalShow: status});
    }

    setGender = (gender) => {
        this.setState({gender});
    }

    submit = () => {

        if (this.state.gender !== AppConst.MALE && this.state.gender !== AppConst.FEMALE) {
            this.setState({error: {gender: 'Please select your gender'}});
        } else {
            this.setState({error: {gender: ''}});
            const {dispatch} = this.props;
            dispatch(AuthAction.setGender(this.state.gender));
        }

    };

    render() {

        const {error, signup, signupMessage, mounted} = this.state;
        const {auth} = this.props;

        if (mounted && !signup) return <Redirect to={{ pathname: `/signup`, errorMessage: 'Sign up first.'}} />;

        if (mounted && auth.data?.status) return <Redirect to={{pathname: `/`, header: {status: 'success', message: `Welcome to ${AppConst.APP_NAME}`}}}/>;

        if (mounted && auth.data?.status === false && Object.keys(auth.data.errors).length > 0) {
            this.setState({...this.state, ...{error: auth.data?.errors}});
            auth.data.errors = {};
        }

        let message = auth.data?.message;
        if (message) auth.data.message = null;

        return (
            <>
                <div className="mb-5 text-center">
                    <img src={logo} alt="Logo" width={40} style={{marginTop: -10}}/>
                    <span className="color-accent font-size-25 m-1">oney<b>Drop</b></span>
                </div>
                <Card border="light" className={`border-radius-10`}>
                    <Card.Body className={`p-5 text-center`}>
                        <img src={success} className={`img-fluid`} alt={`success`}/>
                        <h3 className={`color-accent mt-2`}>Success!</h3>
                        <p className={`font-size-15 mt-3 pr-5 pl-5`}>{signupMessage || 'You have successfully been registered on our app and can now start using it'}</p>
                        <div className="col mt-5">
                            <Button variant="primary" type="button" size="lg" onClick={() => this.setModalShow(true)}
                                    className={`font-size-16 min-width-80-per min-height-60 text-uppercase`}>
                                Continue to Dashboard
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
                <Modal
                    show={this.state.modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static">
                    <Modal.Header closeButton={false}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h3 className={`color-accent font-size-22 font-weight-bold`}>One more thing</h3>
                            <p className={`font-size-16`}>Please select your gender</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={`text-center`}>
                        <Row className={`mb-3 mt-3`}>
                            <Col>
                                <div className={`gender-check-box-container`} onClick={() => {this.setGender(AppConst.MALE)}}>
                                    <img src={male} className={`img-fluid`} alt={`male`}/>
                                    <div className={`gender-check-box`}>
                                        {this.state.gender === AppConst.MALE && <img src={checkmark} className={`w-75`} alt={`checkmark`}/>}
                                    </div>
                                    <p className={`mt-2 text-black-50 font-weight-bold`}>Male</p>
                                </div>
                            </Col>
                            <Col>
                                <div className={`gender-check-box-container`} onClick={() => {this.setGender(AppConst.FEMALE)}}>
                                    <img src={female} className={`img-fluid`} alt={`male`}/>
                                    <div className={`gender-check-box`}>
                                        {this.state.gender === AppConst.FEMALE && <img src={checkmark} className={`w-75`} alt={`checkmark`}/>}
                                    </div>
                                    <p className={`mt-2 text-black-50 font-weight-bold`}>Female</p>
                                </div>
                            </Col>
                        </Row>
                        <small className={`text-${auth.data?.status ? 'success' : 'danger'}`}>{mounted && (error.gender || message)}</small>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className={`text-center`} onClick={() => this.submit()}>
                            {auth.requesting ? <Spinner animation="border" variant="light" /> : 'Done'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.genderAuth
    }
}

export default connect(mapStateToProps)(SignupSuccessful)