import React, { Component } from "react";
import Shimmer from "react-shimmer-effect";
import injectSheet from "react-jss";

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
        height: "25px",
        width: "25px",
        borderRadius: "5px"
    },
    line: {
        width: "60px",
        height: "8px",
        borderRadius: "8px"
    }
};
class TranstionShimmer extends Component {
    render() {
        const { classes, key } = this.props;
        return (
            <tr className={`border-bottom`} key={key}>
                <td><Shimmer><div className={classes.circle} /></Shimmer></td>
                <td><Shimmer><div className={classes.line} /></Shimmer></td>
                <td><Shimmer><div className={classes.line} /></Shimmer></td>
                <td><Shimmer><div className={classes.line} /></Shimmer></td>
                <td><Shimmer><div className={classes.line} /></Shimmer></td>
                <td><Shimmer><div className={classes.line} /></Shimmer></td>
            </tr>
        );
    }
}

export default injectSheet(StyleSheet)(TranstionShimmer);