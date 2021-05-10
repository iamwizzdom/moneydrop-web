import {UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

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
    return fetch(UrlConst.PROFILE_RATE_REQUEST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, type), requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'picture'), requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.PROFILE_UPDATE_REQUEST_URL, 'picture-remove'), requestOptions).then(ResponseHandler.handleResponse);
};

export const ProfileService = {
    rateUser,
    updateInfo,
    updatePhoto,
    removePhoto,
};