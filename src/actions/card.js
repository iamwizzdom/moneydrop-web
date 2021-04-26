import {CardConst} from '../constants';
import {CardService} from '../services';

export const CardAction = {
    chargeCard,
    verifyCard,
    removeCard,
    logTransRef,
    fetchCards
};

function removeCard(cardID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: CardConst.REMOVE_CARD_REQUEST}
    }

    function success(payload) {
        return {type: CardConst.REMOVE_CARD_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: CardConst.REMOVE_CARD_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await CardService.removeCard(cardID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function verifyCard(data) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: CardConst.VERIFY_CARD_REQUEST}
    }

    function success(payload) {
        return {type: CardConst.VERIFY_CARD_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: CardConst.VERIFY_CARD_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await CardService.verifyCard(data);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function chargeCard(data, cardID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: CardConst.CHARGE_CARD_REQUEST}
    }

    function success(payload) {
        return {type: CardConst.CHARGE_CARD_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: CardConst.CHARGE_CARD_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await CardService.chargeCard(data, cardID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function logTransRef(data) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: CardConst.LOG_TRX_REQUEST}
    }

    function success(payload) {
        return {type: CardConst.LOG_TRX_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: CardConst.LOG_TRX_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await CardService.logTransRef(data);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function fetchCards() {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: CardConst.FETCH_CARDS_REQUEST}
    }

    function success(payload) {
        return {type: CardConst.FETCH_CARDS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: CardConst.FETCH_CARDS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await CardService.fetchCards();

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}