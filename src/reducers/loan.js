import {LoanConst} from '../constants';

const LoanOffersReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_OFFERS_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_OFFERS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_OFFERS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanRequestsReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_REQUESTS_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_REQUESTS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_REQUESTS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanConstReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_CONST_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_CONST_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_CONST_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanOfferReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_OFFER_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_OFFER_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_OFFER_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanRequestReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_REQUEST_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_REQUEST_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_REQUEST_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {LoanOffersReducer, LoanRequestsReducer, LoanConstReducer, LoanOfferReducer, LoanRequestReducer};