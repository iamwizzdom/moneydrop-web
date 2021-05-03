import React, {Component} from "react";
import {Col, Dropdown, Row} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import Card from "../../models/Card";
import visa from '../../assets/images/visa.svg';
import verve from '../../assets/images/verve.svg';
import mastercard from '../../assets/images/mastercard.svg';
import maestro from '../../assets/images/maestro.svg';
import express from '../../assets/images/american-express.svg';
import discover from '../../assets/images/discover.svg';
import diners from '../../assets/images/diners-club.svg';
import jcb from '../../assets/images/jcb.svg';
import card from '../../assets/images/card.svg';
import option from '../../assets/images/three-small-dots.svg';
import checkmark from '../../assets/images/select-checkmark.svg';
import CardShimmer from "./CardShimmer";

class CardLayout extends Component {

    static getCardIcon(brand) {
        brand = brand.toLowerCase();
        if (brand.indexOf("visa") > -1) return visa;
        else if (brand.indexOf("verve") > -1) return verve;
        else if (brand.indexOf("master") > -1) return mastercard;
        else if (brand.indexOf("maestro") > -1) return maestro;
        else if (brand.indexOf("express") > -1) return express;
        else if (brand.indexOf("discover") > -1) return discover;
        else if (brand.indexOf("diners") > -1) return diners;
        else if (brand.indexOf("jcb") > -1) return jcb;
        return card;
    }

    render() {
        const {card, setCardToRemove, onClick, selectCard, selectedCardID} = this.props;

        if (!(card instanceof Card)) return <CardShimmer/>;

        let cardBrand = card.getName() || Utility.ucFirst(card.getBrand());
        cardBrand = cardBrand.toLowerCase().indexOf("card") > -1 ? cardBrand : Utility.sprintf("%s Card", cardBrand);

        return <Col md={selectCard ? 12 : 6} className={`mb-3 ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
            <Row className={`pt-3 pb-3 rounded`}
                 style={{backgroundColor: '#f1f1f1', marginLeft: -10, marginRight: -10}}>
                <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                    <img src={CardLayout.getCardIcon(card.getBrand())} style={{width: 40, height: 40, objectFit: 'cover'}}
                         alt={`transaction-direction`} className={`img-fluid`}/>
                </Col>
                <Col lg={8} md={8} sm={8} xl={8} xs={8} className={`text-left`} style={{marginTop: '-5px'}}>
                    <Row>
                        <Col md={12} className={`font-size-16`}><small>{Utility.sprintf("****  ****  ****  %s", card.getLastFourDigits())}</small></Col>
                        <Col md={12}>
                            <Row>
                                <Col lg={5} md={5} sm={5} xl={5} xs={5} className={`text-muted`}><small>{Utility.sprintf("%s/%s", card.getExpMonth(), card.getExpYear())}</small></Col>
                                <Col lg={7} md={7} sm={7} xl={7} xs={7} className={`color-accent text-right`}><small>{cardBrand}</small></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={2} md={2} sm={2} xl={2} xs={2} className={`text-right`}>
                    {selectCard ? (card.getUuid() === selectedCardID ? <img src={checkmark} width={20} alt={`selected`}/> : null) : (setCardToRemove ? <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic" className={`no-shadow`}>
                            <img src={option} width={10} height={20} alt={`option`}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setCardToRemove(card)}>Remove Card</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> : null)}
                </Col>
            </Row>
        </Col>;
    }
}

export default CardLayout;