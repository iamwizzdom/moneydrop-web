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

const rateUser = (rate, id) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify({id, rate})
    };
    return fetch(UrlConst.PROFILE_RATE_REQUEST_URL, requestOptions).then(handleResponse);
};

const updateInfo = (data, type) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, type), requestOptions).then(handleResponse);
};

const updatePhoto = (image) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: image
    };
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'picture'), requestOptions).then(handleResponse);
};

const removePhoto = () => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'picture-remove'), requestOptions).then(handleResponse);
};

export const ProfileService = {
    rateUser,
    updateInfo,
    updatePhoto,
    removePhoto,
};