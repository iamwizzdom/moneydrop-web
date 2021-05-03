import React, {Component} from "react";
import {Badge, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import Utility from "../../helpers/Utility";
import backArrow from '../../assets/images/dark-back-arrow.svg';
import logo from '../../assets/images/logo.svg';
import Transaction from "../../models/Transaction";
import CardLayout from "../layout/CardLayout";
import * as htmlToImage from 'html-to-image';
import watermark from "watermarkjs/lib";
import {isMobile} from 'react-device-detect';

class TransactionReceipt extends Component {

    state = {
        transaction: null,
        mounted: false,
        savingReceipt: false,
    }

    componentDidMount() {
        const {state} = this.props.location;
        if (state && !(state.transaction instanceof Transaction) && Utility.isObject(state.transaction)) {
            state.transaction = new Transaction(state.transaction.transObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    saveReceipt = () => {
        const {transaction} = this.state;
        const instance = this;
        let elem = document.getElementById('receipt-layout');
        this.setState({savingReceipt: true});
        htmlToImage.toPng(elem, { quality: 0.95 })
            .then(function (dataUrl) {
                watermark([dataUrl, logo])
                    .dataUrl(function (target, logo) {
                        let context = target.getContext('2d');
                        context.save();

                        context.globalAlpha = .1;

                        let minDimension = isMobile ? 450 : 200;
                        let width = logo.width, height = logo.height;
                        let logoRatio = width / height;

                        if (logoRatio > 1) {
                            if (width < minDimension) width = minDimension;
                            height = (width / logoRatio);
                        } else {
                            if (height < minDimension) height = minDimension;
                            width = (height * logoRatio);
                        }

                        context.drawImage(logo, ((target.width - width) / 2), ((target.height - height) / 2), width, height);

                        context.restore();
                        return target;
                    })
                    .then(function (url) {
                        let link = document.createElement('a');
                        link.download = `moneydrop-receipt-${transaction.getReference()}.png`;
                        link.href = url;
                        link.click();
                        instance.setState({savingReceipt: false});
                    });
            });
    }

    render() {

        let {mounted, transaction, savingReceipt, from} = this.state;

        if (!mounted) return null;

        if (mounted && !(transaction instanceof Transaction)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid transaction data'}}} />;
        }

        let theme = Utility.getTheme(transaction.getStatus(), false);
        let card = transaction.getCard();

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Receipt
                    </h4>
                </Col>
                <Col className={`mb-3 text-right`}>
                    <Button variant={`outline-primary`} className={`border-accent background-accent-hover color-accent-lazy`} onClick={this.saveReceipt}>
                        {savingReceipt ? <Spinner animation="border" variant="light" size={`sm`}/> : 'Save'}
                    </Button>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border="light" className={`p-3 border-radius-10`} id={`receipt-layout`}>
                        <Card.Body>
                            <Row className={`underline-dotted pb-1`}>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Transaction Type</small>
                                            <p className={`mt-1`}>{transaction.getType()}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Transaction Direction</small>
                                            <p className={`mt-1`}>{transaction.getDirection()}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row className={`text-right`}>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <img
                                                src={card !== null ? CardLayout.getCardIcon(card.getBrand()) : logo}
                                                style={{width: 40, height: 40, objectFit: 'cover'}} alt={`transaction-card`}
                                                className={`mb-3`}/>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Amount</small>
                                            <p className={`font-weight-bold mt-1`}>{Utility.format(parseFloat(transaction.getAmount()))}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={`mt-3`}>
                                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                    <small className={`p text-muted`}>Transaction Reference</small>
                                    <p className={`font-size-13 mt-1`}>{transaction.getReference()}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Charges</small>
                                            <p className={`mt-1`}>{Utility.format(parseFloat(transaction.getFees()))}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Status</small>
                                            <p className={`mt-1`}><Badge variant={theme.badge}>{transaction.getStatus() || "Unknown"}</Badge></p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-right`}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Currency</small>
                                            <p className={`mt-1`}>{transaction.getCurrency()}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Date & Time</small>
                                            <p className={`mt-1`}>{transaction.getDateTime()}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                    <small className={`p text-muted`}>Narration</small>
                                    <p className={`mt-1`}>{transaction.getNarration() || 'No narrative'}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

export default TransactionReceipt