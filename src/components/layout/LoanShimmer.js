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
        height: "40px",
        width: "40px",
        borderRadius: "50%"
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
        width: "60px",
        height: "8px",
        borderRadius: "8px"
    }
};
class LoanShimmer extends Component {
    render() {
        const { classes, key } = this.props;
        return (
            <Col md={6} className={`pt-3 pb-3`} key={key}>
                <Row>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2}><Shimmer><div className={classes.circle} /></Shimmer></Col>
                    <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`} style={{marginTop: '-5px'}}>
                        <Row>
                            <Col md={12}><Shimmer><div className={classes.lineLong} /></Shimmer></Col>
                            <Col md={12}><Shimmer><div className={classes.lineMedium} /></Shimmer></Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={4} sm={4} xl={4} xs={4} className={`text-right`}>
                        <Row>
                            <Col><Shimmer><div className={classes.line} /></Shimmer></Col>
                            <Col><Shimmer><div className={classes.line} /></Shimmer></Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default injectSheet(StyleSheet)(LoanShimmer);