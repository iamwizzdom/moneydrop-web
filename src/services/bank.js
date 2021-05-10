import {UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const removeBank = (bankID) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.BANK_ACCOUNT_REMOVE_URL, bankID), requestOptions).then(ResponseHandler.handleResponse);
};

const creditBank = (data, bankID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.WALLET_CASH_OUT_URL, bankID), requestOptions).then(ResponseHandler.handleResponse);
};

const verifyBank = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.BANK_ACCOUNT_ADD_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const fetchBanks = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(UrlConst.BANK_ACCOUNT_RETRIEVE_ALL_URL, requestOptions).then(ResponseHandler.handleResponse);
};

export const BankService = {
    removeBank,
    creditBank,
    verifyBank,
    fetchBanks
};