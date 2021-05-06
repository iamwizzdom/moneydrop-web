import {UrlConst} from "../constants";
import Utility from "../helpers/Utility";

function handleResponse(response) {
    if (response.status === 419) {
        sessionStorage.clear();
        localStorage.clear();
        alert("Session expired");
        window.location.assign('/login');
        return;
    }

    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}

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
    return fetch(UrlConst.LOGIN_URL, requestOptions).then(handleResponse);
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
    return fetch(type === 'email' ? UrlConst.VERIFY_EMAIL_REQUEST_URL : UrlConst.VERIFY_PHONE_REQUEST_URL, requestOptions).then(handleResponse);
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
    return fetch(type === 'email' ? UrlConst.VERIFY_EMAIL_URL : UrlConst.VERIFY_PHONE_URL, requestOptions).then(handleResponse);
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
    return fetch(UrlConst.REGISTRATION_URL, requestOptions).then(handleResponse);
};

const setGender = (gender) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken(),
        },
        body: JSON.stringify({gender})
    };
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'gender'), requestOptions).then(handleResponse);
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
    return fetch(UrlConst.FORGOT_PASSWORD_URL, requestOptions).then(handleResponse);
};

const resetPassword = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    };
    return fetch(UrlConst.RESET_PASSWORD_URL, requestOptions).then(handleResponse);
};

const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.assign('/login');
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