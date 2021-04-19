import {TransactionConst} from '../constants';

const TransactionReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case TransactionConst.TRANSACTION_REQUEST:
            return {...state, requesting: true};
        case TransactionConst.TRANSACTION_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case TransactionConst.TRANSACTION_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {TransactionReducer};