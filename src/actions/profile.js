import {ProfileConst} from '../constants';
import {ProfileService} from '../services';

export const ProfileAction = {
    rateUser,
    updateInfo,
    updatePhoto,
    removePhoto,
};

function rateUser(rate, id) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ProfileConst.PROFILE_RATING_REQUEST}
    }

    function success(payload) {
        return {type: ProfileConst.PROFILE_RATING_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ProfileConst.PROFILE_RATING_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ProfileService.rateUser(rate, id);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function updateInfo(data, type) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_REQUEST}
    }

    function success(payload) {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ProfileConst.PROFILE_INFO_UPDATE_FAILURE, payload}
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

function updatePhoto(image) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ProfileConst.PROFILE_PICTURE_UPDATE_REQUEST}
    }

    function success(payload) {
        return {type: ProfileConst.PROFILE_PICTURE_UPDATE_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ProfileConst.PROFILE_PICTURE_UPDATE_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ProfileService.updatePhoto(image);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function removePhoto() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ProfileConst.PROFILE_PICTURE_REMOVE_REQUEST}
    }

    function success(payload) {
        return {type: ProfileConst.PROFILE_PICTURE_REMOVE_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ProfileConst.PROFILE_PICTURE_REMOVE_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ProfileService.removePhoto();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}