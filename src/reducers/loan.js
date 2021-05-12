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

const LoanApplyReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_APPLY_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_APPLY_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_APPLY_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanRevokeReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_REVOKE_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_REVOKE_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_REVOKE_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanApplicationsReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_APPLICATIONS_REQUEST:
            return {...state, requesting: true};
        case LoanConst.LOAN_APPLICATIONS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case LoanConst.LOAN_APPLICATIONS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const LoanApplicationGrantReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_APPLICATION_GRANT_REQUEST:
            return {...state, requesting: true, id: action.id};
        case LoanConst.LOAN_APPLICATION_GRANT_SUCCESS:
            return {...state, requesting: false, data: action.payload, id: action.id};
        case LoanConst.LOAN_APPLICATION_GRANT_FAILURE:
            return {...state, requesting: false, data: action.payload, id: action.id};

        default:
            return state;
    }
};

const LoanApplicationCancelReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_APPLICATION_CANCEL_REQUEST:
            return {...state, requesting: true, id: action.id};
        case LoanConst.LOAN_APPLICATION_CANCEL_SUCCESS:
            return {...state, requesting: false, data: action.payload, id: action.id};
        case LoanConst.LOAN_APPLICATION_CANCEL_FAILURE:
            return {...state, requesting: false, data: action.payload, id: action.id};

        default:
            return state;
    }
};

const LoanRepaymentReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_REPAYMENT_REQUEST:
            return {...state, requesting: true, id: action.id};
        case LoanConst.LOAN_REPAYMENT_SUCCESS:
            return {...state, requesting: false, data: action.payload, id: action.id};
        case LoanConst.LOAN_REPAYMENT_FAILURE:
            return {...state, requesting: false, data: action.payload, id: action.id};

        default:
            return state;
    }
};

const LoanRepaymentHistoryReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case LoanConst.LOAN_REPAYMENT_HISTORY_REQUEST:
            return {...state, requesting: true, id: action.id};
        case LoanConst.LOAN_REPAYMENT_HISTORY_SUCCESS:
            return {...state, requesting: false, data: action.payload, id: action.id};
        case LoanConst.LOAN_REPAYMENT_HISTORY_FAILURE:
            return {...state, requesting: false, data: action.payload, id: action.id};

        default:
            return state;
    }
};

export {
    LoanOffersReducer,
    LoanRequestsReducer,
    LoanConstReducer,
    LoanOfferReducer,
    LoanRequestReducer,
    LoanApplyReducer,
    LoanRevokeReducer,
    LoanApplicationsReducer,
    LoanApplicationGrantReducer,
    LoanApplicationCancelReducer,
    LoanRepaymentReducer,
    LoanRepaymentHistoryReducer,
};