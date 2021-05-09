import {Alert} from "react-bootstrap";
import React from "react";

const Message = (props) => {

    const {header, onClose, forceUpdateHandler} = props;
    const {status, message} = {...{status: null, message: null}, ...header};

    if (!message) return null;

    if (status === 'error') return <Alert key={1} variant={`danger`} className={`text-center`} onClose={() => {header.message = null; if (onClose) onClose(); else forceUpdateHandler();}} dismissible>{message}</Alert>;
    else if (status === 'warning') return <Alert key={1} variant={`warning`} className={`text-center`} onClose={() => {header.message = null; if (onClose) onClose(); else forceUpdateHandler();}} dismissible>{message}</Alert>;
    else if (status === 'success') return <Alert key={1} variant={`success`} className={`text-center`} onClose={() => {header.message = null; if (onClose) onClose(); else forceUpdateHandler();}} dismissible>{message}</Alert>;
    else return <Alert key={1} variant={`info`} className={`text-center`} onClose={() => {header.message = null; if (onClose) onClose(); else forceUpdateHandler();}} dismissible>{message}</Alert>;
};

export default Message;