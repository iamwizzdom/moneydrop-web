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

const MobileNavLayout = (props) => {

    const {dispatch} = props;

    const logout = () => {
        dispatch(AuthAction.logout())
    };

    return <>
        <Nav variant="pills" activeKey={props.location.pathname} className="flex-column">
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/">
                    <img src={home} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/loans" eventKey={`/loans`}>
                    <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Loans
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/loans/mine" eventKey={`/loans/mine`}>
                    <img src={loan} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    My Loans
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/wallet" eventKey={`/wallet`}>
                    <img src={wallet} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Wallet
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/transactions" eventKey={`/transactions`}>
                    <img src={transactions} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Transactions
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/bank-accounts" eventKey={`/bank-accounts`}>
                    <img src={bank} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Bank Accounts
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/cards" eventKey={`/cards`}>
                    <img src={card} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Cards
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link href="/profile" eventKey={`/profile`}>
                    <img src={user} width={20} className={`mr-3`} style={{marginTop: '-5px', padding: 1.5}} alt={`nav-icon`}/>
                    User Account
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={`my-nav-item`}>
                <Nav.Link onClick={logout}>
                    <img src={logouts} width={20} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                    Logout
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </>;
}

export default MobileNavLayout;