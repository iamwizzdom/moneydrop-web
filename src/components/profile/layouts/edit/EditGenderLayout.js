import React, {Component} from "react";
import swal from "@sweetalert/with-react";
import {Col, Row} from "react-bootstrap";
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
        this.setState({gender}, () => {
            let tm = setTimeout(() => {
                swal.setActionValue(JSON.stringify(this.state));
                clearTimeout(tm);
            }, 500);
        });
    }

    setGender = (gender) => {
        this.setState({gender}, () => {
            swal.setActionValue(JSON.stringify(this.state));
        });
    }

    render() {
        return <>
            <h5 className={`mt-2 mb-4 text-left`}>Update Gender</h5>
            <Row className={`mt-5 mb-3`}>
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
        </>;
    }
}

export default EditGenderLayout;