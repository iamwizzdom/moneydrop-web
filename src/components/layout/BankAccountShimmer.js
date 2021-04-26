import React, { Component } from "react";
import Shimmer from "react-shimmer-effect";
import injectSheet from "react-jss";
import {Col, Row} from "react-bootstrap";

const StyleSheet = {
    container: {
        // border: "0px solid rgba(255, 255, 255, 1)",
        // boxShadow: "0px 0px 20px rgba(0, 0, 0, .1)",
        // borderRadius: "4px",
        // backgroundColor: "white",
        display: "flex",
        padding: "16px",
        width: "100%"
    },
    circle: {
        width: "50px",
        height: "35px",
        borderRadius: "5px"
    },
    lineLong: {
        width: "90%",
        height: "8px",
        borderRadius: "8%"
    },
    lineMedium: {
        width: "50%",
        height: "8px",
        borderRadius: "8%"
    },
    line: {
        width: "5px",
        height: "25px",
    }
};
class BankAccountShimmer extends Component {
    render() {
        const { classes, key } = this.props;
        return (
            <Col md={6} key={key}>
                <Row className={`pt-3 pb-3`}>
                    <Col lg={10} md={10} sm={10} xl={10} xs={10} className={`text-left`} style={{marginTop: '-5px'}}>
                        <Row>
                            <Col md={12}><Shimmer><div className={classes.lineLong} /></Shimmer></Col>
                            <Col md={12}><Shimmer><div className={classes.lineMedium} /></Shimmer></Col>
                        </Row>
                    </Col>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2} className={`text-right`}>
                        <Shimmer><div className={classes.line} /></Shimmer>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default injectSheet(StyleSheet)(BankAccountShimmer);