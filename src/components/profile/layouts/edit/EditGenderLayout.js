import React, {Component} from "react";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {AppConst} from "../../../../constants";
import male from "../../../../assets/images/male-icon.svg";
import checkmark from "../../../../assets/images/checkmark.svg";
import female from "../../../../assets/images/female-icon.svg";

class EditGenderLayout extends Component {

    state = {
        gender: ''
    }

    componentDidMount() {
        const {gender} = this.props;
        this.setState({gender});
    }

    setGender = (gender) => {
        this.setState({gender});
    }

    submit = (e) => {
        e.preventDefault();
        const {submit, type} = this.props;
        submit(this.state, type);
    }

    render() {

        const {profileInfoUpdate} = this.props;

        return <>
            <Row className={`mt-3 mb-3 text-center`}>
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
            <Form.Text className={`text-danger text-center`}>{profileInfoUpdate.data?.errors?.gender}</Form.Text>
            <Button variant="primary" type="submit" onClick={this.submit} className={`font-size-16 min-height-48 mt-4 text-capitalize`} block>
                {profileInfoUpdate.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
            </Button>
        </>;
    }
}

export default EditGenderLayout;