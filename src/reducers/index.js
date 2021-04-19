import {combineReducers} from "redux";
import {AuthReducer} from './auth';
import {DashboardReducer} from './dashboard';
import {WalletReducer} from './wallet';
import {TransactionReducer} from './transaction';
import {LoanRequestsReducer, LoanOffersReducer} from './loan';

const rootReducer = combineReducers({
    auth: AuthReducer,
    dashboard: DashboardReducer,
    loanRequests: LoanRequestsReducer,
    loanOffers: LoanOffersReducer,
    wallet: WalletReducer,
    transaction: TransactionReducer,
});

export default rootReducer;