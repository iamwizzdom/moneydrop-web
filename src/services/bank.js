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

const removeBank = (bankID) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.BANK_ACCOUNT_REMOVE_URL, bankID), requestOptions).then(handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.WALLET_CASH_OUT_URL, bankID), requestOptions).then(handleResponse);
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
    return fetch(UrlConst.BANK_ACCOUNT_ADD_URL, requestOptions).then(handleResponse);
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
    return fetch(UrlConst.BANK_ACCOUNT_RETRIEVE_ALL_URL, requestOptions).then(handleResponse);
};

export const BankService = {
    removeBank,
    creditBank,
    verifyBank,
    fetchBanks
};