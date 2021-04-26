import {HistoryConst} from '../constants';
import {HistoryService} from '../services';

export const HistoryAction = {
    getHistory
};

function getHistory(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: HistoryConst.HISTORY_REQUEST}
    }

    function success(payload) {
        return {type: HistoryConst.HISTORY_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: HistoryConst.HISTORY_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await HistoryService.getHistory(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}