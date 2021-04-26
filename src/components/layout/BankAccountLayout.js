import React, {Component} from "react";
import {Col, Dropdown, Row} from "react-bootstrap";
import option from '../../assets/images/three-small-dots.svg';
import BankAccount from "../../models/BankAccount";
import checkmark from "../../assets/images/select-checkmark.svg";

class BankAccountLayout extends Component {

    render() {
        const {bankAccount, setBankToRemove, onClick, selectAccount, selectedAccountID} = this.props;

        if (!(bankAccount instanceof BankAccount)) return null;

        return <Col md={selectAccount ? 12 : 6} className={`mb-3 ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
            <Row className={`pt-3 pb-3 rounded`}
                 style={{backgroundColor: '#f1f1f1', marginLeft: -10, marginRight: -10}}>
                <Col lg={10} md={10} sm={10} xl={10} xs={10} className={`text-left`} style={{marginTop: '-5px'}}>
                    <Row>
                        <Col md={12}>
                            <small className={`font-size-16`}>{bankAccount.getAccountNumber()}</small>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Col lg={5} md={7} sm={7} xl={7} xs={7} className={`text-muted`}><small>{bankAccount.getAccountName()}</small></Col>
                                <Col lg={5} md={5} sm={5} xl={5} xs={5} className={`color-accent text-right`}><small>{bankAccount.getBankName()}</small></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col lg={2} md={2} sm={2} xl={2} xs={2} className={`text-right`}>
                    {selectAccount ? (bankAccount.getUuid() === selectedAccountID ? <img src={checkmark} width={20} alt={`selected`}/> : null) : (setBankToRemove ? <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic" className={`no-shadow`}>
                            <img src={option} width={10} height={20} alt={`option`}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setBankToRemove(bankAccount)}>Remove account</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> : null)}
                </Col>
            </Row>
        </Col>;
    }
}

export default BankAccountLayout;