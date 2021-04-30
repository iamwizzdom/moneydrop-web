import {NotificationConst} from '../constants';

const FetchNotificationsReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case NotificationConst.FETCH_NOTIFICATIONS_REQUEST:
            return {...state, requesting: true};
        case NotificationConst.FETCH_NOTIFICATIONS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case NotificationConst.FETCH_NOTIFICATIONS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {
    FetchNotificationsReducer
};