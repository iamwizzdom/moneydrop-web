import React, {Component} from "react";
import {connect} from "react-redux";
import {Badge, Table} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import Loan from "../../models/Loan";
import NoContent from "../layout/NoContent";
import {LoanAction} from "../../actions";
import Pagination from "react-js-pagination";
import LoanShimmer from "../layout/LoanShimmer";

class LoanOffers extends Component {

    state = {
        page: 1
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(LoanAction.getLoanOffers(this.state.page));
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {dispatch} = this.props;
        if (prevState.page !== this.state.page) {
            this.props.offers.data = {};
            dispatch(LoanAction.getLoanOffers(this.state.page));
        }
    }

    handlePageChange = (page) => {
        this.setState({page});
    };

    render() {
        const {offers} = this.props;

        let {loans, pagination} = {...{loans: [1, 2, 3, 4, 5], pagination: {page: 1, totalRecords: 0, perPage: 0}}, ...offers.data};

        return <>
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
                        <td>Loan {loan.getLoanType()} {loanUser.isMe() && '(Me)'}</td>
                        <td>{Utility.format(parseFloat(loan.getAmount()))}</td>
                        <td><Badge variant={theme.badge}>{loan.getStatus()}</Badge></td>
                        <td>{loan.getDate()}</td>
                        <td>...</td>
                    </tr>
                })}
                </tbody>
            </Table> : <NoContent/>}
            <div className={`w-100 justify-content-center d-flex mt-3`}>
                {!Utility.isEmpty(loans) && <Pagination
                    activePage={pagination.page}
                    itemsCountPerPage={pagination.perPage}
                    totalItemsCount={pagination.totalRecords}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={5}
                    itemClass="page-item pagination-btn-primary"
                    linkClass="page-link"
                />}
            </div>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        offers: state.loanOffers
    }
}

export default connect(mapStateToProps)(LoanOffers)