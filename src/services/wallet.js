import {UrlConst} from "../constants";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const getWalletData = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(UrlConst.DASHBOARD_REQUEST_URL, requestOptions).then(ResponseHandler.handleResponse);
};

export const WalletService = {
    getWalletData
};