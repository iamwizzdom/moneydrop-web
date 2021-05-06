import {ImportConst} from '../constants';
import {ImportService} from '../services';

export const ImportAction = {
    importCountries,
    importStates
};

function importCountries() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ImportConst.IMPORT_COUNTRIES_REQUEST}
    }

    function success(payload) {
        return {type: ImportConst.IMPORT_COUNTRIES_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ImportConst.IMPORT_COUNTRIES_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ImportService.importCountries();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function importStates() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ImportConst.IMPORT_STATES_REQUEST}
    }

    function success(payload) {
        return {type: ImportConst.IMPORT_STATES_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ImportConst.IMPORT_STATES_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ImportService.importStates();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}