import {AppConst, UrlConst} from "../constants";

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

const getHistory = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.HISTORY_URL, requestOptions).then(handleResponse);
};

export const HistoryService = {
    getHistory
};