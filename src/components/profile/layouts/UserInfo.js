import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import User from "../../../models/User";
import arrow from "../../../assets/images/arrow.svg";
import Utility from "../../../helpers/Utility";

const InfoLayout = (props) => {
    const {title, info, underline} = props;
    return <Col xl={12} lg={12} md={12} sm={12} xs={12} className={`p-3 ${underline && 'underline'}`}>
        <Row>
            <Col xl={3} lg={3} md={3} sm={3} xs={3} className={`p-0 pl-1`}><small className={`font-size-16 font-weight-bold`}>{title}</small></Col>
            <Col xl={9} lg={9} md={9} sm={9} xs={9} className={`text-right`} style={{color: '#777777'}}>
                <small>{info}</small>
                <img src={arrow} width={6} alt={`nav-icon`} className={`ml-3`}/>
            </Col>
        </Row>
    </Col>
}

class UserInfo extends Component {

    render() {
        const {user, isMe} = this.props;

        if (!(user instanceof User)) return null;

        return <>
            <Row>
                <InfoLayout title={`Name`} info={`${user.getFirstname()} ${user.getLastname()}`} underline/>
                {isMe && <InfoLayout title={`Phone`} info={user.getPhone()} underline/>}
                {isMe && <InfoLayout title={`Email`} info={user.getEmail()} underline/>}
                <InfoLayout title={`Gender`} info={Utility.convertGender(user.getGender(), "Unknown")} underline/>
                {isMe && <InfoLayout title={`Date of Birth`} info={user.getDob()} underline/>}
                <InfoLayout title={`Country`} info={user.getCountry()?.getName() || "Unknown"} underline/>
                <InfoLayout title={`State`} info={user.getState()?.getName() || "Unknown"} underline={isMe}/>
                {isMe && <InfoLayout title={`Address`} info={user.getAddress()}/>}
            </Row>
        </>;
    }
}

export default UserInfo;