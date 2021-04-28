import {AuthConst} from '../constants';

const AuthReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case AuthConst.SIGNUP_REQUEST:
            return {...state, requesting: true};
        case AuthConst.SIGNUP_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.SIGNUP_FAILURE:
            return {...state, requesting: false, data: action.payload};

        case AuthConst.VERIFY_REQUEST:
            return {...state, requesting: true};
        case AuthConst.VERIFY_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.VERIFY_FAILURE:
            return {...state, requesting: false, data: action.payload};

        case AuthConst.LOGIN_REQUEST:
            return {...state, requesting: true};
        case AuthConst.LOGIN_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.LOGIN_FAILURE:
            return {...state, requesting: false, data: action.payload};

        case AuthConst.FORGOT_PASSWORD_REQUEST:
            return {...state, requesting: true};
        case AuthConst.FORGOT_PASSWORD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.FORGOT_PASSWORD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        case AuthConst.RESET_PASSWORD_REQUEST:
            return {...state, requesting: true};
        case AuthConst.RESET_PASSWORD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case AuthConst.RESET_PASSWORD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        case AuthConst.LOGOUT:
            return {};
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

export {AuthReducer, GenderAuthReducer};