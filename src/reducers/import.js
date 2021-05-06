import {ImportConst} from '../constants';

const ImportCountriesReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ImportConst.IMPORT_COUNTRIES_REQUEST:
            return {...state, requesting: true};
        case ImportConst.IMPORT_COUNTRIES_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ImportConst.IMPORT_COUNTRIES_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const ImportStatesReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ImportConst.IMPORT_STATES_REQUEST:
            return {...state, requesting: true};
        case ImportConst.IMPORT_STATES_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ImportConst.IMPORT_STATES_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {ImportCountriesReducer, ImportStatesReducer};