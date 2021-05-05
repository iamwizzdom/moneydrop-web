import {ProfileConst} from '../constants';
import {ProfileService} from '../services';

export const ProfileAction = {
    updateInfo
};

function updateInfo(data, type) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_REQUEST, id: type}
    }

    function success(payload) {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_SUCCESS, payload, id: type}
    }

    function failure(payload) {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_FAILURE, payload, id: type}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ProfileService.updateInfo(data, type);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}