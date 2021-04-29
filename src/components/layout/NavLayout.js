import {Nav} from "react-bootstrap";
import home from '../../assets/images/home-nav.svg';
import loan from '../../assets/images/loan-nav.svg';
import wallet from '../../assets/images/wallet-nav.svg';
import transactions from "../../assets/images/transactions.svg";
import bank from "../../assets/images/bank.svg";
import card from "../../assets/images/card.svg";
import history from "../../assets/images/history.svg";
import {LinkContainer} from 'react-router-bootstrap'

const NavLayout = (props) => {

    return <>
        <Nav variant="pills" activeKey={props.location.pathname} className="flex-column">
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/">
                    <Nav.Link eventKey={`/`}>
                        <img src={home} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Home
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/loans">
                    <Nav.Link eventKey={`/loans`}>
                        <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Loans
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/loans/mine">
                    <Nav.Link eventKey={`/loans/mine`}>
                        <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        My Loans
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/wallet">
                    <Nav.Link eventKey={`/wallet`}>
                        <img src={wallet} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Wallet
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/transactions">
                    <Nav.Link eventKey={`/transactions`}>
                        <img src={transactions} width={20} className={`mr-3`} style={{marginTop: '-5px'}}
                             alt={`nav-icon`}/>
                        Transactions
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/history">
                    <Nav.Link eventKey={`/history`}>
                        <img src={history} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        History
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/bank-accounts">
                    <Nav.Link eventKey={`/bank-accounts`}>
                        <img src={bank} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Bank Accounts
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <LinkContainer exact to="/cards">
                    <Nav.Link eventKey={`/cards`}>
                        <img src={card} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Cards
                    </Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    </>;
}

export default NavLayout;