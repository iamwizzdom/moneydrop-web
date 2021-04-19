import React, {Component} from "react";
import {Badge, Button, Card, Col, Row, Table} from "react-bootstrap";
import offer from '../../assets/images/offer-loan.svg';
import request from '../../assets/images/request-loan.svg';
import {DashboardAction} from "../../actions";
import {connect} from "react-redux";
import User from "../../models/User";
import {Link} from "react-router-dom";
import Utility from "../../helpers/Utility";
import Loan from "../../models/Loan";
import Transaction from "../../models/Transaction";
import NoContent from "../layout/NoContent";
import LoanShimmer from "../layout/LoanShimmer";
import TransactionShimmer from "../layout/TransactionShimmer";

class Dashboard extends Component {

    state = {
        error: {},
        navigate: false,
        mounted: false,
        modalShow: false,
        gender: 0
    };

    componentDidMount() {
        const {dispatch, location} = this.props;
        const {state} = location;
        if (this.props.dashboard?.data) this.props.dashboard.data = {};
        dispatch(DashboardAction.getDashboardData());
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    setModalShow = (status) => {
        this.setState({modalShow: status});
    }


    submit = () => {

        if (this.state.gender !== Dashboard.MALE && this.state.gender !== Dashboard.FEMALE) {
            this.setState({error: {gender: 'Please select your gender'}});
        } else {
            this.setState({error: {gender: ''}});
        }

    };

    render() {

        const {dashboard} = this.props;
        const user = new User(localStorage.getItem("user"));

        let {available_balance, loans, transactions} = {...{available_balance: 0, loans: [1, 2, 3], transactions: [1, 2, 3]}, ...dashboard.data};

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>Home</h4>
                    <p>Welcome back, {user.getFirstname()}.</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <p className={`m-0`}>Available balance</p>
                            <h3 className={`color-accent mt-2`}>{Utility.format(available_balance)}</h3>
                            <Button className={`min-width-160 mt-1`}>Fund wallet</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body className={`m-auto`}>
                            <img src={offer} width={40} className={`img-fluid mx-auto d-block`} alt={`offer`}/>
                            <p className={`mt-3 font-size-13`}>Offer Loan</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body className={`m-auto`}>
                            <img src={request} width={37} className={`img-fluid mx-auto d-block m-3`} alt={`request`}/>
                            <p className={`mt-4 font-size-13`}>Request Loan</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Card.Title as="small" className={`h5 font-weight-bold color-accent`}>My Loans</Card.Title>
                            <Link to={`/loans/mine`} className={`float-right color-accent`}>View all</Link>
                            {!Utility.isEmpty(loans) ? <Table className={`mt-3`} responsive borderless>
                                <thead className={`border-bottom`}>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {loans.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <LoanShimmer key={k}/>;

                                    let loan = new Loan(v);
                                    let loanUser = loan.getUser();
                                    let theme = Utility.getTheme(loan.getStatus(), false);

                                    return <tr className={`border-bottom`} key={k}>
                                        <td>
                                            <img
                                                src={(loanUser.getPicture() ? loanUser.getPictureUrl() : null) || loanUser.getDefaultPicture()}
                                                style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`loan-user`}
                                                className={`img-thumbnail rounded-circle border-accent background-accent my-p-0-8`}/>
                                        </td>
                                        <td>Loan {loan.getLoanType()} (Me)</td>
                                        <td>{Utility.format(parseFloat(loan.getAmount()))}</td>
                                        <td><Badge variant={theme.badge}>{loan.getStatus()}</Badge></td>
                                        <td>{loan.getDate()}</td>
                                        <td>...</td>
                                    </tr>
                                })}
                                </tbody>
                            </Table> : <NoContent/>}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Card.Title as="small" className={`h5 font-weight-bold color-accent`}>Transactions</Card.Title>
                            <Link to={`/transactions`} className={`float-right color-accent`}>View all</Link>
                            {!Utility.isEmpty(transactions) ? <Table className={`mt-3`} responsive borderless>
                                <thead className={`border-bottom`}>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <TransactionShimmer key={k}/>;

                                    let trans = new Transaction(v);
                                    let theme = Utility.getTheme(trans.getStatus(), trans.getType()?.toLowerCase() === 'top-up');
                                    return <tr className={`border-bottom`} key={k}>
                                        <td>
                                            <img src={theme.icon} width={25} alt={`transaction-direction`} className={`img-fluid rounded`}/></td>
                                        <td>{trans.getType()}</td>
                                        <td>{Utility.format(parseFloat(trans.getAmount()))}</td>
                                        <td><Badge variant={theme.badge}>{trans.getStatus()}</Badge></td>
                                        <td>{trans.getDate()}</td>
                                        <td>...</td>
                                    </tr>
                                })}
                                </tbody>
                            </Table> : <NoContent/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    }
}

export default connect(mapStateToProps)(Dashboard)