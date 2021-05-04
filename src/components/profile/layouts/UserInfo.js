import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import User from "../../../models/User";
import arrow from "../../../assets/images/arrow.svg";
import Utility from "../../../helpers/Utility";

const InfoLayout = (props) => {
    const {title, info, showCursor, underline} = props;
    return <Col xl={12} lg={12} md={12} sm={12} xs={12} title={`Click to update`} className={`p-3 ${underline && 'underline'} ${showCursor && 'cursor-pointer'}`}>
        <Row style={{paddingRight: 13}}>
            <Col xl={4} lg={4} md={4} sm={4} xs={4} className={`p-0 pl-1`}><small className={`font-size-14 font-weight-bold`}>{title}</small></Col>
            <Col xl={8} lg={8} md={8} sm={8} xs={8} className={`text-right single-line-text text-arrow`} style={{paddingRight: 23, color: '#777777'}}>
                <small>{info}</small>
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
                <InfoLayout title={`Name`} info={`${user.getFirstname()} ${user.getLastname()}`} showCursor={isMe} underline/>
                {isMe && <InfoLayout title={`Phone`} info={user.getPhone()} showCursor={isMe} underline/>}
                {isMe && <InfoLayout title={`Email`} info={user.getEmail()} showCursor={isMe} underline/>}
                <InfoLayout title={`Gender`} info={Utility.convertGender(user.getGender(), "Unknown")} showCursor={isMe} underline/>
                {isMe && <InfoLayout title={`Date of Birth`} info={user.getDob()} showCursor={isMe} underline/>}
                <InfoLayout title={`Country`} info={user.getCountry()?.getName() || "Unknown"} showCursor={isMe} underline/>
                <InfoLayout title={`State`} info={user.getState()?.getName() || "Unknown"} showCursor={isMe} underline={isMe}/>
                {isMe && <InfoLayout title={`Address`} info={user.getAddress()} showCursor={isMe}/>}
            </Row>
        </>;
    }
}

export default UserInfo;