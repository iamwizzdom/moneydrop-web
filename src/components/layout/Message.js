import {Alert} from "react-bootstrap";
import React from "react";

const Message = (props) => {

    const {status, message} = props?.header;

    if (status === 'error') return <Alert key={1} variant={`danger`} className={`text-center`}>{message}</Alert>;
    else if (status === 'warning') return <Alert key={1} variant={`warning`} className={`text-center`}>{message}</Alert>;
    else if (status === 'success') return <Alert key={1} variant={`success`} className={`text-center`}>{message}</Alert>;
    else return <Alert key={1} variant={`info`} className={`text-center`}>{message}</Alert>;
};

export default Message;