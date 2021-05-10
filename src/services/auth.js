import {UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const login = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
    };
    return fetch(UrlConst.LOGIN_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const verifyRequest = (data, type) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    };
    return fetch(type === 'email' ? UrlConst.VERIFY_EMAIL_REQUEST_URL : UrlConst.VERIFY_PHONE_REQUEST_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const verify = (data, type) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    };
    return fetch(type === 'email' ? UrlConst.VERIFY_EMAIL_URL : UrlConst.VERIFY_PHONE_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const signup = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
    };
    return fetch(UrlConst.REGISTRATION_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const setGender = (gender) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken(),
        },
        body: JSON.stringify({gender})
    };
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'gender'), requestOptions).then(ResponseHandler.handleResponse);
};

const forgotPassword = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
    };
    return fetch(UrlConst.FORGOT_PASSWORD_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const resetPassword = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.RESET_PASSWORD_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const logout = () => {
    window.location.assign('/login');
    sessionStorage.clear();
    localStorage.clear();
};

export const AuthService = {
    setGender,
    signup,
    login,
    verifyRequest,
    verify,
    logout,
    forgotPassword,
    resetPassword
};