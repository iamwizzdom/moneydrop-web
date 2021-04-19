import {WalletConst} from '../constants';

const WalletReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case WalletConst.WALLET_REQUEST:
            return {...state, requesting: true};
        case WalletConst.WALLET_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case WalletConst.WALLET_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {WalletReducer};