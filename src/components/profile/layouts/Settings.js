import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import arrow from "../../../assets/images/arrow.svg";

const SettingLayout = (props) => {
    const {title, underline} = props;
    return <Col xl={12} lg={12} md={12} sm={12} xs={12} className={`p-3 ${underline && 'underline'}`}>
        <Row>
            <Col xl={8} lg={8} md={8} sm={8} xs={8} className={`p-0 pl-1`}><small className={`font-size-14 font-weight-bold`}>{title}</small></Col>
            <Col xl={4} lg={4} md={4} sm={4} xs={4} className={`text-right`}>
                <img src={arrow} width={6} alt={`nav-icon`} className={`ml-3`}/>
            </Col>
        </Row>
    </Col>
}

class Settings extends Component {

    render() {
        return <Row>
            <SettingLayout title={`Change Password`} underline/>
            <SettingLayout title={`Privacy Policy`} underline/>
            <SettingLayout title={`Terms and Conditions`} underline/>
            <SettingLayout title={`Help & Contact Us`}/>
        </Row>;
    }
}

export default Settings;