import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, Tab, Col, Row, Card} from "react-bootstrap";
import {AppConst} from "../../constants";
import LoanOffers from "./MyLoanOffers";
import LoanRequests from "./MyLoanRequests";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {Link} from "react-router-dom";

class MyLoans extends Component {

    state = {
        currentTab: 'offers'
    }

    onTabSelected = (key) => {
        this.setState({currentTab: key});
    };

    render() {
        return <>
            <Row>
                <Col md={6}>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        {this.state.currentTab === 'offers' ? 'Loan Offers' : 'Loan Requests'}
                    </h4>
                    <p>Loans you made on {AppConst.APP_NAME}</p>
                </Col>
                <Col md={6} className={`mt-3 mb-3 loan-type-btn-aligner`}>
                    <Link to={`/loan/offer`} className={`btn btn-primary text-decoration-none pl-4 pr-4 m-1 my-rounded`}>Offer Loan</Link>
                    <Link to={`/loan/request`} className={`btn btn-warning text-dark text-decoration-none pl-4 pr-4 m-1 my-rounded`}>Request Loan</Link>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10`}>
                        <Card.Body>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="offers" onSelect={this.onTabSelected}>
                                <Row>
                                    <Col md={12}>
                                        <Nav className={`justify-content-center`} variant="pills">
                                            <div className={`d-flex my-rounded`} style={{backgroundColor: '#e9c5b5'}}>
                                                <Nav.Item className={`my-tab-nav-item m-2`}>
                                                    <Nav.Link className={`my-rounded`} eventKey="offers">Offers</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className={`my-tab-nav-item m-2`}>
                                                    <Nav.Link className={`my-rounded`} eventKey="requests">Requests</Nav.Link>
                                                </Nav.Item>
                                            </div>
                                        </Nav>
                                    </Col>
                                    <Col md={12} className={`mt-3`}>
                                        <Tab.Content className={`p-2`}>
                                            <Tab.Pane eventKey="offers">
                                                <LoanOffers currentTab={() => this.state.currentTab} {...this.props}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="requests">
                                                <LoanRequests currentTab={() => this.state.currentTab} {...this.props}/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        loans: state.loans
    }
}

export default connect(mapStateToProps)(MyLoans)