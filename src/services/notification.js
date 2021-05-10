import {AppConst, UrlConst} from "../constants";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const getNotifications = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.NOTIFICATIONS_URL, requestOptions).then(ResponseHandler.handleResponse);
};

export const NotificationService = {
    getNotifications
};