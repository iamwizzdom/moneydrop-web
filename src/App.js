import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import LayoutRoute from "./components/layout/router";
import AuthLayout from "./components/layout/AuthLayout";
import {PrivateLogin, PrivateRoute} from "./PrivateRoute";
import AppLayout from "./components/layout/AppLayout";

import Login from "./components/auth/login/Login";
import {connect} from "react-redux";
import VerifyEmail from "./components/auth/signup/verification/VerifyEmail";
import VerifyData from "./components/auth/signup/verification/VerifyData";
import VerifyPhone from "./components/auth/signup/verification/VerifyPhone";
import Signup from "./components/auth/signup/Signup";
import SignupSuccessful from "./components/auth/signup/SignupSuccessful";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Loans from "./components/loans/Loans";
import Wallet from "./components/wallet/Wallet";
import MyLoans from "./components/my-loans/MyLoans";
import Transactions from "./components/transaction/Transactions";
import OfferLoan from "./components/loan/OfferLoan";
import RequestLoan from "./components/loan/RequestLoan";
import History from "./components/history/History";
import Cards from "./components/cards/Cards";
import BankAccounts from "./components/bank-accounts/BankAccounts";
import LoanDetails from "./components/loans/LoanDetails";
import LoanApplicants from "./components/loans/LoanApplicants";
import LoanApplicationDetail from "./components/history/LoanApplicationDetail";
import LoanRepaymentHistory from "./components/history/LoanRepaymentHistory";
import TransactionReceipt from "./components/transaction/TransactionReceipt";
import Notifications from "./components/notification/Notifications";

function App() {
    return (
        <Router>
            <React.Suspense fallback={<></>}>
                <Switch>

                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/email/verify" component={VerifyData}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/email" component={VerifyEmail}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/phone/verify" component={VerifyData}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/phone" component={VerifyPhone}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/successful" component={SignupSuccessful} forceView={true}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup" component={Signup}/>
                    <PrivateLogin exact layout={AuthLayout} path="/login" component={Login}/>

                    <PrivateRoute exact layout={AppLayout} path="/bank-accounts" component={BankAccounts}/>
                    <PrivateRoute exact layout={AppLayout} path="/cards" component={Cards}/>
                    <PrivateRoute exact layout={AppLayout} path="/history" component={History}/>
                    <PrivateRoute exact layout={AppLayout} path="/transactions" component={Transactions}/>
                    <PrivateRoute exact layout={AppLayout} path="/transaction/receipt" component={TransactionReceipt}/>
                    <PrivateRoute exact layout={AppLayout} path="/wallet" component={Wallet}/>
                    <PrivateRoute exact layout={AppLayout} path="/loans" component={Loans}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/details" component={LoanDetails}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/applicants" component={LoanApplicants}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/application/details" component={LoanApplicationDetail}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/application/repayments" component={LoanRepaymentHistory}/>
                    <PrivateRoute exact layout={AppLayout} path="/loans/mine" component={MyLoans}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/offer" component={OfferLoan}/>
                    <PrivateRoute exact layout={AppLayout} path="/loan/request" component={RequestLoan}/>
                    <PrivateRoute exact layout={AppLayout} path="/notifications" component={Notifications}/>
                    <PrivateRoute exact layout={AppLayout} path="/" component={Dashboard}/>

                    <LayoutRoute layout={AuthLayout} component={NotFound}/>
                </Switch>
            </React.Suspense>
        </Router>
    );
}

export default connect(null, null)(App);
