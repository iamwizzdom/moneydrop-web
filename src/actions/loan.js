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

export const LoanAction = {
    getLoanRequests,
    getLoanOffers,
    getMyLoanRequests,
    getMyLoanOffers,
    getLoanConst,
    offerLoan,
    requestLoan
};