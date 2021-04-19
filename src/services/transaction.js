import {AppConst, UrlConst} from "../constants";
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

const getTransactions = (page) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(`${UrlConst.TRANSACTION_LIST_URL}?${Utility.serialize({page})}`, requestOptions).then(handleResponse);
};

export const TransactionService = {
    getTransactions
};