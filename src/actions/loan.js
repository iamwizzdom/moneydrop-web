import {LoanConst} from '../constants';
import {LoanService} from '../services';

function getLoanRequests(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_REQUESTS_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_REQUESTS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_REQUESTS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getLoanRequests(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getLoanOffers(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_OFFERS_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_OFFERS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_OFFERS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getLoanOffers(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getMyLoanRequests(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_REQUESTS_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_REQUESTS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_REQUESTS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getMyLoanRequests(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getMyLoanOffers(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_OFFERS_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_OFFERS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_OFFERS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getMyLoanOffers(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getLoanConst() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_CONST_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_CONST_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_CONST_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getLoanConst();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function offerLoan(data) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_OFFER_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_OFFER_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_OFFER_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.offerLoan(data);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function requestLoan(data) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_REQUEST_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_REQUEST_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_REQUEST_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.requestLoan(data);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function loanApply(data, loanID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_APPLY_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_APPLY_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_APPLY_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.loanApply(data, loanID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getLoanApplications(loanID, link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_APPLICATIONS_REQUEST}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_APPLICATIONS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_APPLICATIONS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.getLoanApplications(loanID, link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function grantLoanApplication(loanID, applicationID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_APPLICATION_GRANT_REQUEST, id: applicationID}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_APPLICATION_GRANT_SUCCESS, id: applicationID, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_APPLICATION_GRANT_FAILURE, id: applicationID, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.grantLoanApplication(loanID, applicationID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function cancelLoanApplication(loanID, applicationID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: LoanConst.LOAN_APPLICATION_CANCEL_REQUEST, id: applicationID}
    }

    function success(payload) {
        return {type: LoanConst.LOAN_APPLICATION_CANCEL_SUCCESS, id: applicationID, payload}
    }

    function failure(payload) {
        return {type: LoanConst.LOAN_APPLICATION_CANCEL_FAILURE, id: applicationID, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await LoanService.cancelLoanApplication(loanID, applicationID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

export const LoanAction = {
    getLoanRequests,
    getLoanOffers,
    getMyLoanRequests,
    getMyLoanOffers,
    getLoanConst,
    offerLoan,
    requestLoan,
    loanApply,
    getLoanApplications,
    grantLoanApplication,
    cancelLoanApplication,
};