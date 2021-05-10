import {UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const removeCard = (cardID) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.CARD_REMOVE_URL, cardID), requestOptions).then(ResponseHandler.handleResponse);
};

const chargeCard = (data, cardID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.WALLET_TOP_UP_URL, cardID), requestOptions).then(ResponseHandler.handleResponse);
};

const verifyCard = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.CARD_VERIFICATION_URL, requestOptions).then((res) => {
        if (res.status === 419) logTransRef(data);
        return ResponseHandler.handleResponse(res);
    });
};

const logTransRef = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.CARD_TRANS_LOG_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const fetchCards = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(UrlConst.CARD_RETRIEVE_ALL_URL, requestOptions).then(ResponseHandler.handleResponse);
};

export const CardService = {
    chargeCard,
    removeCard,
    verifyCard,
    logTransRef,
    fetchCards
};