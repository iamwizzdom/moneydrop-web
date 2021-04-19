import React, {Component} from "react";
import {Badge, Card, Col, Row, Table} from "react-bootstrap";
import {AppConst} from "../../constants";
import {TransactionAction} from "../../actions";
import {connect} from "react-redux";
import Utility from "../../helpers/Utility";
import NoContent from "../layout/NoContent";
import Pagination from "react-js-pagination";
import TransactionShimmer from "../layout/TransactionShimmer";
import Transaction from "../../models/Transaction";

class Transactions extends Component {

    state = {
        page: 1
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(TransactionAction.getTransactions(this.state.page));
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {dispatch} = this.props;
        if (prevState.page !== this.state.page) {
            this.props.transaction.data = {};
            dispatch(TransactionAction.getTransactions(this.state.page));
        }
    }

    handlePageChange = (page) => {
        this.setState({page});
    };

    render() {
        const {transaction} = this.props;

        let {transactions, pagination} = {...{transactions: [1, 2, 3, 4, 5], pagination: {page: 1, totalRecords: 0, perPage: 0}}, ...transaction.data};

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>Transactions</h4>
                    <p>Transactions you made on {AppConst.APP_NAME}</p>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10`}>
                        <Card.Body className={`p-2`}>
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
                            <div className={`w-100 justify-content-center d-flex mt-3`}>
                                {!Utility.isEmpty(transactions) && <Pagination
                                    activePage={pagination.page}
                                    itemsCountPerPage={pagination.perPage}
                                    totalItemsCount={pagination.totalRecords}
                                    onChange={this.handlePageChange}
                                    pageRangeDisplayed={5}
                                    itemClass="page-item pagination-btn-primary"
                                    linkClass="page-link"
                                />}
                            </div>
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