import {WalletConst} from '../constants';
import {WalletService} from '../services';

export const WalletAction = {
    getWalletData
};

function getWalletData() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: WalletConst.WALLET_REQUEST}
    }

    function success(payload) {
        return {type: WalletConst.WALLET_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: WalletConst.WALLET_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await WalletService.getWalletData();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}