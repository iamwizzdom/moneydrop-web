import User from "./User";
import Utility from "../helpers/Utility";
import Card from "./Card";

class Transaction {

    transObject = {};

    constructor(trans) {
        this.setValues(trans);
    }

    getId() {
        return this.transObject.id;
    }

    setId(id) {
        this.transObject.id = id;
    }

    getAmount() {
        return this.transObject.amount;
    }

    setAmount(amount) {
        this.transObject.amount = amount;
    }

    getFees() {
        return this.transObject.fees;
    }

    setFees(fees) {
        this.transObject.fees = fees;
    }

    getReference() {
        return this.transObject.reference;
    }

    setReference(reference) {
        this.transObject.reference = reference;
    }

    getType() {
        return this.transObject.type_readable;
    }

    setType(type) {
        this.transObject.type_readable = type;
    }

    getDirection() {
        return this.transObject.direction_readable;
    }

    setDirection(direction) {
        this.transObject.direction_readable = direction;
    }

    getCurrency() {
        return this.transObject.currency;
    }

    setCurrency(currency) {
        this.transObject.currency = currency;
    }

    getNarration() {
        return this.transObject.narration;
    }

    setNarration(narration) {
        this.transObject.narration = narration;
    }

    getStatus() {
        return this.transObject.status_readable;
    }

    setStatus(status) {
        this.transObject.status_readable = status;
    }

    getDate() {
        return this.transObject.date;
    }

    setDate(date) {
        this.transObject.date = date;
    }

    getDateTime() {
        return this.transObject.date_time;
    }

    setDateTime(dateTime) {
        this.transObject.date_time = dateTime;
    }

    /**
     *
     * @returns {Card|*}
     */
    getCard(): Card {
        if (!(this.transObject.card instanceof Card))
            this.transObject.card = new Card(this.transObject.card.cardObject || this.transObject.card)
        return this.transObject.card;
    }

    setCard(card: Card) {
        this.transObject.card = card;
    }

    /**
     *
     * @returns {User}
     */
    getUser(): Card {
        if (!(this.transObject.user instanceof User))
            this.transObject.user = new User(this.transObject.user.userObject || this.transObject.user)
        return this.transObject.user;
    }

    setUser(user: User) {
        this.transObject.user = user;
    }

    getObject() {
        return this.transObject;
    }

    setValues(trans) {
        this.transObject = Utility.isString(trans) ? JSON.parse(trans) : (Utility.isObject(trans) ? trans : {});
    }
}

export default Transaction;