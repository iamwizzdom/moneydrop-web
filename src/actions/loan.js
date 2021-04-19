import {LoanConst} from '../constants';
import {LoanService} from '../services';

export const LoanAction = {
    getLoanRequests,
    getLoanOffers,
    getMyLoanRequests,
    getMyLoanOffers
};

function getLoanRequests(page) {
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
            const res = await LoanService.getLoanRequests(page);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getLoanOffers(page) {
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
            const res = await LoanService.getLoanOffers(page);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getMyLoanRequests(page) {
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
            const res = await LoanService.getMyLoanRequests(page);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function getMyLoanOffers(page) {
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
            const res = await LoanService.getMyLoanOffers(page);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}