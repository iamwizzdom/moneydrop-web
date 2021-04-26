import {CardConst} from '../constants';

const ChargeCardReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case CardConst.CHARGE_CARD_REQUEST:
            return {...state, requesting: true};
        case CardConst.CHARGE_CARD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case CardConst.CHARGE_CARD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const VerifyCardReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case CardConst.VERIFY_CARD_REQUEST:
            return {...state, requesting: true};
        case CardConst.VERIFY_CARD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case CardConst.VERIFY_CARD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const RemoveCardReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case CardConst.REMOVE_CARD_REQUEST:
            return {...state, requesting: true};
        case CardConst.REMOVE_CARD_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case CardConst.REMOVE_CARD_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LogTrxReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case CardConst.LOG_TRX_REQUEST:
            return {...state, requesting: true};
        case CardConst.LOG_TRX_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case CardConst.LOG_TRX_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const FetchCardsReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case CardConst.FETCH_CARDS_REQUEST:
            return {...state, requesting: true};
        case CardConst.FETCH_CARDS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case CardConst.FETCH_CARDS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {
    RemoveCardReducer,
    VerifyCardReducer,
    LogTrxReducer,
    FetchCardsReducer,
    ChargeCardReducer
};