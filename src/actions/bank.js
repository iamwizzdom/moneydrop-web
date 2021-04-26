import {BankConst} from '../constants';
import {BankService} from '../services';

export const BankAction = {
    creditBank,
    verifyBank,
    removeBank,
    fetchBanks
};

function removeBank(bankID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: BankConst.REMOVE_BANK_REQUEST}
    }

    function success(payload) {
        return {type: BankConst.REMOVE_BANK_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: BankConst.REMOVE_BANK_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await BankService.removeBank(bankID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function creditBank(data, bankID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: BankConst.CREDIT_BANK_REQUEST}
    }

    function success(payload) {
        return {type: BankConst.CREDIT_BANK_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: BankConst.CREDIT_BANK_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await BankService.creditBank(data, bankID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function verifyBank(data) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: BankConst.VERIFY_BANK_REQUEST}
    }

    function success(payload) {
        return {type: BankConst.VERIFY_BANK_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: BankConst.VERIFY_BANK_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await BankService.verifyBank(data);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function fetchBanks() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: BankConst.FETCH_BANKS_REQUEST}
    }

    function success(payload) {
        return {type: BankConst.FETCH_BANKS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: BankConst.FETCH_BANKS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await BankService.fetchBanks();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}