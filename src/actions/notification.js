import {NotificationConst} from '../constants';
import {NotificationService} from '../services';

export const NotificationAction = {
    getNotifications
};

function getNotifications(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: NotificationConst.FETCH_NOTIFICATIONS_REQUEST}
    }

    function success(payload) {
        return {type: NotificationConst.FETCH_NOTIFICATIONS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: NotificationConst.FETCH_NOTIFICATIONS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await NotificationService.getNotifications(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}