import {BankConst} from '../constants';

const CreditBankReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case BankConst.CREDIT_BANK_REQUEST:
            return {...state, requesting: true};
        case BankConst.CREDIT_BANK_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case BankConst.CREDIT_BANK_FAILURE:
            return {...state, requesting: false, data: action.payload};
        default:
            return state;
    }
};

const VerifyBankReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case BankConst.VERIFY_BANK_REQUEST:
            return {...state, requesting: true};
        case BankConst.VERIFY_BANK_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case BankConst.VERIFY_BANK_FAILURE:
            return {...state, requesting: false, data: action.payload};
        default:
            return state;
    }
};

const RemoveBankReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case BankConst.REMOVE_BANK_REQUEST:
            return {...state, requesting: true};
        case BankConst.REMOVE_BANK_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case BankConst.REMOVE_BANK_FAILURE:
            return {...state, requesting: false, data: action.payload};
        default:
            return state;
    }
};

const FetchBanksReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case BankConst.FETCH_BANKS_REQUEST:
            return {...state, requesting: true};
        case BankConst.FETCH_BANKS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case BankConst.FETCH_BANKS_FAILURE:
            return {...state, requesting: false, data: action.payload};
        default:
            return state;
    }
};

export {
    CreditBankReducer,
    RemoveBankReducer,
    VerifyBankReducer,
    FetchBanksReducer
};