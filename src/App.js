// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import LayoutRoute from "./components/layout/router";
import AuthLayout from "./components/layout/AuthLayout";
// import AppLayout from "./components/layout/AppLayout";

import Login from "./components/auth/login/Login";
import {connect} from "react-redux";
import VerifyEmail from "./components/auth/signup/verification/VerifyEmail";
import VerifyData from "./components/auth/signup/verification/VerifyData";
import VerifyPhone from "./components/auth/signup/verification/VerifyPhone";
import Signup from "./components/auth/signup/Signup";
import SignupSuccessful from "./components/auth/signup/SignupSuccessful";
import NotFound from "./components/NotFound";
import {PrivateLogin, PrivateRoute} from "./PrivateRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/dashboard/Dashboard";
import Loans from "./components/loans/Loans";
import Wallet from "./components/wallet/Wallet";
import MyLoans from "./components/my-loans/MyLoans";
import Transactions from "./components/transaction/Transactions";

function App() {
    return (
        <Router>
            <React.Suspense fallback={<></>}>
                <Switch>

                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/email/verify" component={VerifyData}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/email" component={VerifyEmail}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/phone/verify" component={VerifyData}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/verification/phone" component={VerifyPhone}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup/successful" component={SignupSuccessful}/>
                    <PrivateLogin exact layout={AuthLayout} path="/signup" component={Signup}/>
                    <PrivateLogin exact layout={AuthLayout} path="/login" component={Login}/>

                    <PrivateRoute exact layout={AppLayout} path="/transactions" component={Transactions}/>
                    <PrivateRoute exact layout={AppLayout} path="/wallet" component={Wallet}/>
                    <PrivateRoute exact layout={AppLayout} path="/loans" component={Loans}/>
                    <PrivateRoute exact layout={AppLayout} path="/loans/mine" component={MyLoans}/>
                    <PrivateRoute exact layout={AppLayout} path="/" component={Dashboard}/>

                    <LayoutRoute layout={AuthLayout} component={NotFound}/>
                </Switch>
            </React.Suspense>
        </Router>
    );
}

export default connect(null, null)(App);
