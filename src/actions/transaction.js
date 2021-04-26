import {TransactionConst} from '../constants';
import {TransactionService} from '../services';

export const TransactionAction = {
    getTransactions
};

function getTransactions(link) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: TransactionConst.TRANSACTION_REQUEST}
    }

    function success(payload) {
        return {type: TransactionConst.TRANSACTION_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: TransactionConst.TRANSACTION_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await TransactionService.getTransactions(link);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}