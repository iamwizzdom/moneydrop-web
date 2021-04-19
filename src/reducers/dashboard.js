import {DashboardConst} from '../constants';

const DashboardReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case DashboardConst.DASHBOARD_DATA_REQUEST:
            return {...state, requesting: true};
        case DashboardConst.DASHBOARD_DATA_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case DashboardConst.DASHBOARD_DATA_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {DashboardReducer};