import {Nav} from "react-bootstrap";
import home from '../../assets/images/home-nav.svg';
import loan from '../../assets/images/loan-nav.svg';
import wallet from '../../assets/images/wallet-nav.svg';
import user from '../../assets/images/user.svg';
import transactions from '../../assets/images/transactions.svg';
import bank from '../../assets/images/bank.svg';
import card from '../../assets/images/card.svg';
import logouts from '../../assets/images/logouts.svg';
import {AuthAction} from "../../actions";
import history from "../../assets/images/history.svg";
import {LinkContainer} from "react-router-bootstrap";
import swal from "@sweetalert/with-react";
import logMeOut from "../../assets/images/log-me-out.svg";
import React from "react";

const MobileNavLayout = (props) => {

    const {hideMenu} = props;

    const logout = () => {
        hideMenu();
        swal(<span className={`color-accent`}>Are you sure you want to logout?</span>, {
            icon: logMeOut,
            buttons: {
                cancel: "No, I'm not ready",
                confirm: "Yes, Log me out"
            }
        }).then(status => {
            if (status) {
                const {dispatch} = props;
                dispatch(AuthAction.logout());
            }
        });
    };

    return <>
        <Nav variant="pills" activeKey={props.location.pathname} className="flex-column">
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/">
                    <Nav.Link eventKey={`/`} onSelect={hideMenu}>
                        <img src={home} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Home
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/loans">
                    <Nav.Link eventKey={`/loans`} onSelect={hideMenu}>
                        <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Loans
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/loans/mine">
                    <Nav.Link eventKey={`/loans/mine`} onSelect={hideMenu}>
                        <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        My Loans
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/wallet">
                    <Nav.Link eventKey={`/wallet`} onSelect={hideMenu}>
                        <img src={wallet} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Wallet
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/transactions">
                    <Nav.Link eventKey={`/transactions`} onSelect={hideMenu}>
                        <img src={transactions} width={20} className={`mr-3`} style={{marginTop: '-5px'}}
                             alt={`nav-icon`}/>
                        Transactions
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/history">
                    <Nav.Link eventKey={`/history`} onSelect={hideMenu}>
                        <img src={history} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        History
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/bank-accounts">
                    <Nav.Link eventKey={`/bank-accounts`} onSelect={hideMenu}>
                        <img src={bank} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Bank Accounts
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/cards">
                    <Nav.Link eventKey={`/cards`} onSelect={hideMenu}>
                        <img src={card} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Cards
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to={{pathname: `/user/profile`, state: {user: null}}}>
                    <Nav.Link eventKey={`/user/profile`} onSelect={hideMenu}>
                        <img src={user} width={20} className={`mr-3`} style={{marginTop: '-5px', padding: 1.5}}
                             alt={`nav-icon`}/>
                        User Account
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link onClick={logout} onSelect={hideMenu}>
                    <img src={logouts} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Logout
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </>;
}

export default MobileNavLayout;