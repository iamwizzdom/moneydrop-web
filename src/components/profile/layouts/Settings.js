import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

const SettingLayout = (props) => {
    const {title, underline} = props;
    return <Col xl={12} lg={12} md={12} sm={12} xs={12} className={`p-3 ${underline && 'underline'}`}>
        <Row style={{paddingRight: 13}}>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className={`p-0 pl-1 text-arrow`}>
                <small className={`font-size-14 font-weight-bold`}>{title}</small>
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