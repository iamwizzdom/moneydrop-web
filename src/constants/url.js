class UrlBaseConst {
    static HTTP_SCHEME = "http://";
    static HTTPS_SCHEME = "https://";
    static SCHEME = UrlBaseConst.HTTPS_SCHEME;
    static HOST_URL = "moneydrop.ng:8085/moneydrop/server";
    // static HOST_URL = "moneydrop.test";
    // static HOST_URL = "192.168.0.109:8000";
// static HOST_URL = "10.101.184.107:8000";
// static HOST_URL = "54.93.104.127/moneydrop/server";
    static BASE_URL = UrlBaseConst.SCHEME + UrlBaseConst.HOST_URL;
    static API_URL = UrlBaseConst.BASE_URL + "/api/v1/w-app";
}

export const UrlConst = {

    BASE_URL: UrlBaseConst.BASE_URL,

    IMPORT_COUNTRIES_URL: UrlBaseConst.API_URL + "/import/countries",
    IMPORT_STATES_URL: UrlBaseConst.API_URL + "/import/states",
    LOGIN_URL: UrlBaseConst.API_URL + "/auth/login",
    REGISTRATION_URL: UrlBaseConst.API_URL + "/auth/register",
    FORGOT_PASSWORD_URL: UrlBaseConst.API_URL + "/auth/password/forgot",
    RESET_PASSWORD_URL: UrlBaseConst.API_URL + "/auth/password/reset",
    VERIFY_EMAIL_REQUEST_URL: UrlBaseConst.API_URL + "/auth/verification/email/request",
    VERIFY_EMAIL_URL: UrlBaseConst.API_URL + "/auth/verification/email/verify",
    VERIFY_PHONE_REQUEST_URL: UrlBaseConst.API_URL + "/auth/verification/phone/request",
    VERIFY_PHONE_URL: UrlBaseConst.API_URL + "/auth/verification/phone/verify",
    DASHBOARD_REQUEST_URL: UrlBaseConst.API_URL + "/dashboard",
    PROFILE_UPDATE_REQUEST_URL: UrlBaseConst.API_URL + "/user/profile/update/%s",
    PROFILE_INFO_REQUEST_URL: UrlBaseConst.API_URL + "/user/profile/info",
    PROFILE_RATE_REQUEST_URL: UrlBaseConst.API_URL + "/user/rate",
    USER_LOAN_REQUEST_LIST_URL: UrlBaseConst.API_URL + "/user/loan/requests",
    USER_LOAN_OFFER_LIST_URL: UrlBaseConst.API_URL + "/user/loan/offers",
    LOAN_REQUEST_LIST_URL: UrlBaseConst.API_URL + "/loan/requests",
    LOAN_OFFER_LIST_URL: UrlBaseConst.API_URL + "/loan/offers",
    LOAN_APPLICANTS_URL: UrlBaseConst.API_URL + "/loan/%s/applicants",
    LOAN_APPLICATION_GRANT_URL: UrlBaseConst.API_URL + "/loan/%s/application/%s/grant",
    LOAN_APPLY_URL: UrlBaseConst.API_URL + "/loan/%s/apply",
    LOAN_REVOKE_URL: UrlBaseConst.API_URL + "/loan/%s/revoke",
    LOAN_APPLICATION_CANCEL_URL: UrlBaseConst.API_URL + "/loan/%s/application/%s/cancel",
    TRANSACTION_LIST_URL: UrlBaseConst.API_URL + "/user/transactions",
    CARD_TRANS_LOG_URL: UrlBaseConst.API_URL + "/user/card/add/reference",
    CARD_VERIFICATION_URL: UrlBaseConst.API_URL + "/user/card/add/verify",
    CARD_RETRIEVE_ALL_URL: UrlBaseConst.API_URL + "/user/card/retrieve/all",
    CARD_REMOVE_URL: UrlBaseConst.API_URL + "/user/card/remove/%s",
    BANK_ACCOUNT_ADD_URL: UrlBaseConst.API_URL + "/user/bank/add-account",
    BANK_ACCOUNT_RETRIEVE_ALL_URL: UrlBaseConst.API_URL + "/user/bank/retrieve/all",
    BANK_ACCOUNT_REMOVE_URL: UrlBaseConst.API_URL + "/user/bank/remove/%s",
    WALLET_TOP_UP_URL: UrlBaseConst.API_URL + "/user/wallet/top-up/%s",
    WALLET_CASH_OUT_URL: UrlBaseConst.API_URL + "/user/wallet/cash-out/%s",
    LOAN_REQUEST_URL: UrlBaseConst.API_URL + "/loan/request",
    LOAN_OFFER_URL: UrlBaseConst.API_URL + "/loan/offer",
    LOAN_CONSTANTS_URL: UrlBaseConst.API_URL + "/loan/constants",
    NOTIFICATIONS_URL: UrlBaseConst.API_URL + "/notifications",
    HISTORY_URL: UrlBaseConst.API_URL + "/history",
    LOAN_REPAYMENT_URL: UrlBaseConst.API_URL + "/loan/application/%s/repayment",
    LOAN_REPAYMENT_HISTORY_URL: UrlBaseConst.API_URL + "/loan/application/%s/repayment/history",
    LOAN_APPLICANT_REVIEW_URL: UrlBaseConst.API_URL + "/loan/application/%s/review",
    USER_REVIEWS_URL: UrlBaseConst.API_URL + "/user/%s/reviews",
    EDIT_REVIEW_URL: UrlBaseConst.API_URL + "/review/%s/edit",
    DELETE_REVIEW_URL: UrlBaseConst.API_URL + "/review/%s/delete",
};