import {DashboardConst} from '../constants';
import {DashboardService} from '../services';

export const DashboardAction = {
    getDashboardData
};

function getDashboardData() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: DashboardConst.DASHBOARD_DATA_REQUEST}
    }

    function success(payload) {
        return {type: DashboardConst.DASHBOARD_DATA_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: DashboardConst.DASHBOARD_DATA_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await DashboardService.getDashboardData();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}