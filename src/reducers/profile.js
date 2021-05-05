import {ProfileConst} from '../constants';

const ProfileInfoUpdateReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ProfileConst.PROFILE_INFO_UPDATE_REQUEST:
            return {...state, requesting: true, type: action.id};
        case ProfileConst.PROFILE_INFO_UPDATE_SUCCESS:
            return {...state, requesting: false, data: action.payload, type: action.id};
        case ProfileConst.PROFILE_INFO_UPDATE_FAILURE:
            return {...state, requesting: false, data: action.payload, type: action.id};

        default:
            return state;
    }
};

const ProfilePictureUpdateReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ProfileConst.PROFILE_PICTURE_UPDATE_REQUEST:
            return {...state, requesting: true};
        case ProfileConst.PROFILE_PICTURE_UPDATE_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ProfileConst.PROFILE_PICTURE_UPDATE_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const ProfilePictureRemoveReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ProfileConst.PROFILE_PICTURE_REMOVE_REQUEST:
            return {...state, requesting: true};
        case ProfileConst.PROFILE_PICTURE_REMOVE_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ProfileConst.PROFILE_PICTURE_REMOVE_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {
    ProfileInfoUpdateReducer,
    ProfilePictureUpdateReducer,
    ProfilePictureRemoveReducer
};