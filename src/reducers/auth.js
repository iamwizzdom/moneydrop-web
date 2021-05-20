import {AuthConst} from '../constants';

const LoginReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.LOGIN_REQUEST:
            return {...state, requesting: true};
        case AuthConst.LOGIN_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.LOGIN_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoginWithGoogleReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.LOGIN_WITH_GOOGLE_REQUEST:
            return {...state, requesting: true};
        case AuthConst.LOGIN_WITH_GOOGLE_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.LOGIN_WITH_GOOGLE_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const VerifyReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.VERIFY_REQUEST:
            return {...state, requesting: true};
        case AuthConst.VERIFY_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.VERIFY_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const VerifyAuthReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.VERIFY_AUTH_REQUEST:
            return {...state, requesting: true};
        case AuthConst.VERIFY_AUTH_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.VERIFY_AUTH_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const SignupReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.SIGNUP_REQUEST:
            return {...state, requesting: true};
        case AuthConst.SIGNUP_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.SIGNUP_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const ForgotPasswordReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.FORGOT_PASSWORD_REQUEST:
            return {...state, requesting: true};
        case AuthConst.FORGOT_PASSWORD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.FORGOT_PASSWORD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const ResetPasswordReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.RESET_PASSWORD_REQUEST:
            return {...state, requesting: true};
        case AuthConst.RESET_PASSWORD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.RESET_PASSWORD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const GenderAuthReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.GENDER_REQUEST:
            return {...state, requesting: true};
        case AuthConst.GENDER_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.GENDER_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LogoutReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.LOGOUT:
            return {};

        default:
            return state;
    }
};

export {LoginReducer, LoginWithGoogleReducer, VerifyReducer, VerifyAuthReducer, SignupReducer, ForgotPasswordReducer, ResetPasswordReducer, GenderAuthReducer, LogoutReducer};