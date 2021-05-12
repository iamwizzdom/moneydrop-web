import {combineReducers} from "redux";
import {LoginReducer, VerifyReducer, VerifyAuthReducer, SignupReducer, ForgotPasswordReducer, ResetPasswordReducer, GenderAuthReducer, LogoutReducer} from './auth';
import {DashboardReducer} from './dashboard';
import {WalletReducer} from './wallet';
import {TransactionReducer} from './transaction';
import {HistoryReducer} from './history';
import {VerifyCardReducer, FetchCardsReducer, LogTrxReducer, RemoveCardReducer, ChargeCardReducer} from './card';
import {VerifyBankReducer, FetchBanksReducer, RemoveBankReducer, CreditBankReducer} from './bank';
import {
    LoanRequestsReducer,
    LoanOffersReducer,
    LoanConstReducer,
    LoanRequestReducer,
    LoanOfferReducer,
    LoanApplyReducer,
    LoanRevokeReducer,
    LoanApplicationsReducer,
    LoanApplicationGrantReducer,
    LoanApplicationCancelReducer,
    LoanRepaymentReducer,
    LoanRepaymentHistoryReducer,
} from './loan';
import {FetchNotificationsReducer} from "./notification";
import {ReviewUserReducer, FetchReviewsReducer, EditReviewReducer, DeleteReviewReducer} from "./review";
import {ProfileRateReducer, ProfileInfoUpdateReducer, ProfilePictureUpdateReducer, ProfilePictureRemoveReducer} from "./profile";
import {ImportCountriesReducer, ImportStatesReducer} from "./import";

const rootReducer = combineReducers({
    loginAuth: LoginReducer,
    logOut: LogoutReducer,
    verifyRequest: VerifyReducer,
    verifyAuth: VerifyAuthReducer,
    signup: SignupReducer,
    genderAuth: GenderAuthReducer,
    forgotPassword: ForgotPasswordReducer,
    resetPassword: ResetPasswordReducer,
    dashboard: DashboardReducer,
    loanRequests: LoanRequestsReducer,
    loanOffers: LoanOffersReducer,
    loanConst: LoanConstReducer,
    loanRequest: LoanRequestReducer,
    loanOffer: LoanOfferReducer,
    loanApply: LoanApplyReducer,
    loanRevoke: LoanRevokeReducer,
    loanApplications: LoanApplicationsReducer,
    loanApplicationGrant: LoanApplicationGrantReducer,
    loanApplicationCancel: LoanApplicationCancelReducer,
    loanRepayment: LoanRepaymentReducer,
    loanRepaymentHistory: LoanRepaymentHistoryReducer,
    wallet: WalletReducer,
    transaction: TransactionReducer,
    history: HistoryReducer,
    verifyCard: VerifyCardReducer,
    chargeCard: ChargeCardReducer,
    transLog: LogTrxReducer,
    fetchCards: FetchCardsReducer,
    removeCard: RemoveCardReducer,
    creditBank: CreditBankReducer,
    verifyBank: VerifyBankReducer,
    fetchBanks: FetchBanksReducer,
    removeBank: RemoveBankReducer,
    fetchNotifications: FetchNotificationsReducer,
    reviewUser: ReviewUserReducer,
    editReview: EditReviewReducer,
    deleteReview: DeleteReviewReducer,
    fetchReviews: FetchReviewsReducer,
    profileRateUpdate: ProfileRateReducer,
    profileInfoUpdate: ProfileInfoUpdateReducer,
    profilePictureUpdate: ProfilePictureUpdateReducer,
    profileRemoveUpdate: ProfilePictureRemoveReducer,
    importCountries: ImportCountriesReducer,
    importStates: ImportStatesReducer,
});

export default rootReducer;