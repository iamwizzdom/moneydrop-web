import React, {Component} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {AppConst} from "../../constants";
import {TransactionAction} from "../../actions";
import {connect} from "react-redux";
import Utility from "../../helpers/Utility";
import NoContent from "../layout/NoContent";
import TransactionShimmer from "../layout/TransactionShimmer";
import Transaction from "../../models/Transaction";
import TransactionLayout from "../layout/TransactionLayout";
import backArrow from "../../assets/images/dark-back-arrow.svg";

class Transactions extends Component {

    state = {
        transactions: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(TransactionAction.getTransactions());
        window.onscroll = () => {

            if ((window.scrollY >= (document.body.clientHeight - window.innerHeight)) &&
                this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {transaction} = this.props;
        const {requesting} = transaction;

        const {transactions, pagination} = {...{transactions: [], pagination: {nextPage: null}}, ...transaction.data};

        if (transactions.length > 0) {
            this.setLoans(transactions);
            transaction.data.transactions = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setLoans = (data) => {
        this.setState({transactions: [...this.state.transactions, ...data]});
    };

    setIsLoading = (status) => {
        this.setState({isLoading: status});
    };

    setNextPage = (url) => {
        this.setState({nextPage: url});
    };

    setHasMoreData = (status) => {
        this.setState({hasMoreData: status});
    };

    loadMoreData = (url) => {
        const {dispatch} = this.props;
        dispatch(TransactionAction.getTransactions(url));
    };

    render() {
        const {transaction} = this.props;
        const {requesting} = transaction;

        let transactions = (this.state.transactions.length > 0  || !requesting ? this.state.transactions : [1, 2, 3, 4, 5, 6]);

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Transactions
                    </h4>
                    <p>Transactions you made on {AppConst.APP_NAME}</p>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(transactions) ? <Row className={`underline-children`}>
                                {transactions.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <TransactionShimmer key={k}/>;

                                    return <TransactionLayout key={k} transaction={new Transaction(v)}/>;
                                })}
                            </Row> : <NoContent title={`No Transaction`}/>}
                            {(!requesting && !this.state.hasMoreData && this.state.transactions.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
                            {
                                requesting && this.state.transactions.length > 0 ?
                                    <div className="col-md-12 justify-content-center d-flex mt-5">
                                        <Spinner animation="border" variant="warning"/>
                                    </div> : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        transaction: state.transaction
    }
}

export default connect(mapStateToProps)(Transactions)