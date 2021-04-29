import {combineReducers} from "redux";
import {AuthReducer, GenderAuthReducer} from './auth';
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
    LoanApplicationsReducer,
    LoanApplicationGrantReducer,
    LoanApplicationCancelReducer
} from './loan';

const rootReducer = combineReducers({
    auth: AuthReducer,
    genderAuth: GenderAuthReducer,
    dashboard: DashboardReducer,
    loanRequests: LoanRequestsReducer,
    loanOffers: LoanOffersReducer,
    loanConst: LoanConstReducer,
    loanRequest: LoanRequestReducer,
    loanOffer: LoanOfferReducer,
    loanApply: LoanApplyReducer,
    loanApplications: LoanApplicationsReducer,
    loanApplicationGrant: LoanApplicationGrantReducer,
    loanApplicationCancel: LoanApplicationCancelReducer,
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
    removeBank: RemoveBankReducer
});

export default rootReducer;