import Utility from "../helpers/Utility";

class Card {

    cardObject = {};

    constructor(card) {
        this.setValues(card);
    }

    getId() {
        return this.cardObject.id;
    }

    setId(id) {
        this.cardObject.id = id;
    }

    getUuid() {
        return this.cardObject.uuid;
    }

    setUuid(uuid) {
        this.cardObject.uuid = uuid;
    }

    getName() {
        return this.cardObject.name;
    }

    setName(name) {
        this.cardObject.name = name;
    }

    getBrand() {
        return this.cardObject.brand;
    }

    setBrand(brand) {
        this.cardObject.brand = brand;
    }

    getLastFourDigits() {
        return this.cardObject.last4digits;
    }

    setLastFourDigits(lastFourDigits) {
        this.cardObject.last4digits = lastFourDigits;
    }

    getExpMonth() {
        return this.cardObject.exp_month;
    }

    setExpMonth(expMonth) {
        this.cardObject.exp_month = expMonth;
    }

    getExpYear() {
        return this.cardObject.exp_year;
    }

    setExpYear(expYear) {
        this.cardObject.exp_year = expYear;
    }

    setValues(card) {
        this.cardObject = Utility.isString(card) ? JSON.parse(card) : (Utility.isObject(card) ? card : {});
    }
}

export default Card;