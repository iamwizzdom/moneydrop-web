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

export {LoanOffersReducer, LoanRequestsReducer};