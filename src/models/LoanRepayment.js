import User from "./User";
import Transaction from "./Transaction";
import Utility from "../helpers/Utility";

class LoanRepayment {

    repaymentObject = {};

    constructor(repaymentObject) {
        this.setValues(repaymentObject);
    }

    getId() {
        return this.repaymentObject.id;
    }

    setId(id) {
        this.repaymentObject.id = id;
    }

    getAmount() {
        return this.repaymentObject.amount;
    }

    setAmount(amount) {
        this.repaymentObject.amount = amount;
    }

    getReference() {
        return this.repaymentObject.uuid;
    }

    setReference(reference) {
        this.repaymentObject.uuid = reference;
    }

    getApplicationReference() {
        return this.repaymentObject.application_id;
    }

    setApplicationReference(applicationReference) {
        this.repaymentObject.application_id = applicationReference;
    }

    getDate() {
        return this.repaymentObject.date;
    }

    setDate(date) {
        this.repaymentObject.date = date;
    }

    getTransaction() {
        if (!(this.repaymentObject.transaction instanceof Transaction)) {
            this.repaymentObject.transaction = new Transaction(this.repaymentObject.transaction.transObject || this.repaymentObject.transaction);
        }
        return this.repaymentObject.transaction;
    }

    getPayer() {
        if (!(this.repaymentObject.payer instanceof User)) {
            this.repaymentObject.payer = new User(this.repaymentObject.payer.userObject || this.repaymentObject.payer);
        }
        return this.repaymentObject.payer;
    }

    setValues(repaymentObject) {
        this.repaymentObject = Utility.isString(repaymentObject) ? JSON.parse(repaymentObject) : (Utility.isObject(repaymentObject) ? repaymentObject : {});
    }

}

export default LoanRepayment;