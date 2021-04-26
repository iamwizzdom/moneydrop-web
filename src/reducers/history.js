import {HistoryConst} from '../constants';

const HistoryReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case HistoryConst.HISTORY_REQUEST:
            return {...state, requesting: true};
        case HistoryConst.HISTORY_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case HistoryConst.HISTORY_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {HistoryReducer};