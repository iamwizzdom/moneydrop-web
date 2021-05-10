import {UrlConst} from "../constants";
import ResponseHandler from "./ResponseHandler";

const importCountries = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    return fetch(UrlConst.IMPORT_COUNTRIES_URL, requestOptions).then(ResponseHandler.handleResponse);
};

const importStates = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    return fetch(UrlConst.IMPORT_STATES_URL, requestOptions).then(ResponseHandler.handleResponse);
};

export const ImportService = {
    importCountries,
    importStates
};