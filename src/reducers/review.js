import {ReviewConst} from '../constants';

const ReviewUserReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ReviewConst.REVIEW_USER_REQUEST:
            return {...state, requesting: true};
        case ReviewConst.REVIEW_USER_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ReviewConst.REVIEW_USER_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const EditReviewReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ReviewConst.EDIT_REVIEW_REQUEST:
            return {...state, requesting: true};
        case ReviewConst.EDIT_REVIEW_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ReviewConst.EDIT_REVIEW_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const DeleteReviewReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ReviewConst.DELETE_REVIEW_REQUEST:
            return {...state, requesting: true};
        case ReviewConst.DELETE_REVIEW_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ReviewConst.DELETE_REVIEW_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

const FetchReviewsReducer = (state = {requesting: false, data: {}}, action) => {

    switch (action.type) {

        case ReviewConst.FETCH_REVIEWS_REQUEST:
            return {...state, requesting: true};
        case ReviewConst.FETCH_REVIEWS_SUCCESS:
            return {...state, requesting: false, data: action.payload};
        case ReviewConst.FETCH_REVIEWS_FAILURE:
            return {...state, requesting: false, data: action.payload};

        default:
            return state;
    }
};

export {
    ReviewUserReducer,
    EditReviewReducer,
    DeleteReviewReducer,
    FetchReviewsReducer,
};