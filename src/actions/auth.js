import {AuthConst} from '../constants';
import {AuthService} from '../services';

export const AuthAction = {
    login,
    logout,
    verifyRequest,
    verify,
    signup,
    forgotPassword,
    resetPassword,
    setGender
};

function login(email, password) {
    // return the promise using fetch which adds to localstorage on resolve
    const user = {email, password};

    function request() {
        return {type: AuthConst.LOGIN_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.LOGIN_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.LOGIN_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await AuthService.login(user);

            if (res.status && res.response.user) {
                sessionStorage.setItem('token', res.response.user.token);
                localStorage.setItem('user', JSON.stringify(res.response.user));
                localStorage.setItem('cards', JSON.stringify(res.response.cards));
                localStorage.setItem('bank-accounts', JSON.stringify(res.response['bank-accounts']));
                dispatch(success(res));
            } else {
                dispatch(failure(res));
            }

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function verifyRequest(data, type) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: AuthConst.VERIFY_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.VERIFY_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.VERIFY_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await AuthService.verifyRequest(data, type);

            if (res.status) {
                dispatch(success(res));
            } else {
                dispatch(failure(res));
            }

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function verify(data, type) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: AuthConst.VERIFY_AUTH_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.VERIFY_AUTH_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.VERIFY_AUTH_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await AuthService.verify(data, type);

            if (res.status) {
                dispatch(success(res));
            } else {
                dispatch(failure(res));
            }

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function forgotPassword(email) {
    // return the promise using fetch which adds to localstorage on resolve
    const credentials = {email};

    function request() {
        return {type: AuthConst.FORGOT_PASSWORD_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.FORGOT_PASSWORD_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.FORGOT_PASSWORD_FAILURE, payload}
    }

    return async function dispatch(dispatch) {
        dispatch(request());
        try {
            const res = await AuthService.forgotPassword(credentials);
            dispatch(success(res));

        } catch (err) {
            const errorMsg = await err;
            dispatch(failure(errorMsg.errors || errorMsg.msg));
        }
    }
}

function resetPassword(email, code, password) {
    // return the promise using fetch which adds to localstorage on resolve
    const credentials = {email, code, password, password_confirmation: password};

    function request() {
        return {type: AuthConst.RESET_PASSWORD_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.RESET_PASSWORD_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.RESET_PASSWORD_FAILURE, payload}
    }

    return async function dispatch(dispatch) {
        dispatch(request());
        try {
            const res = await AuthService.resetPassword(credentials);
            // console.log(res)
            dispatch(success(res));

        } catch (err) {
            const errorMsg = await err;
            dispatch(failure(errorMsg.errors || errorMsg.msg));
        }
    }
}

function logout() {
    AuthService.logout();
    return {
        type: AuthConst.LOGOUT
    }
}

function signup(user) {
    // return the promise using fetch which dispatches appropriately 
    function request() {
        return {type: AuthConst.SIGNUP_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.SIGNUP_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.SIGNUP_FAILURE, payload}
    }

    return async function dispatch(dispatch) {
        dispatch(request());
        try {
            const res = await AuthService.signup(user);

            if (res.status && res.response.user) {
                sessionStorage.setItem('token', res.response.user.token);
                localStorage.setItem('user', JSON.stringify(res.response.user));
                localStorage.setItem('cards', JSON.stringify(res.response.cards));
                localStorage.setItem('bank-accounts', JSON.stringify(res.response.banks));
                dispatch(success(res));
            } else {
                dispatch(failure(res));
            }

            dispatch(success(res));
        } catch (err) {
            const errorMsg = await err;
            dispatch(failure(errorMsg));
        }
    }
}

function setGender(gender) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: AuthConst.GENDER_REQUEST}
    }

    function success(payload) {
        return {type: AuthConst.GENDER_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: AuthConst.GENDER_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await AuthService.setGender(gender);

            if (res.status) {
                dispatch(success(res));
            } else {
                dispatch(failure(res));
            }

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}