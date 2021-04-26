import Utility from "../helpers/Utility";
import User from "./User";

class Loan {

    loanObject = {};

    constructor(loan) {
        this.setValues(loan);
    }

    getId() {
        return this.loanObject.id;
    }

    setId(id) {
        this.loanObject.id = id;
    }

    getUuid() {
        return this.loanObject.uuid;
    }

    setUuid(uuid) {
        this.loanObject.uuid = uuid;
    }

    isLoanOffer() {
        return this.getLoanType().toLowerCase() === 'offer';
    }

    isLoanRequest() {
        return this.getLoanType().toLowerCase() === 'request';
    }

    getLoanType() {
        return this.loanObject.loan_type_readable;
    }

    setLoanType(loanType) {
        this.loanObject.loan_type_readable = loanType;
    }

    getInterestType() {
        return this.loanObject.interest_type_readable;
    }

    setInterestType(interestType) {
        this.loanObject.interest_type_readable = interestType;
    }

    getAmount() {
        return this.loanObject.amount;
    }

    setAmount(amount) {
        this.loanObject.amount = amount;
    }

    getTenure() {
        return this.loanObject.tenure_readable;
    }

    setTenure(tenure) {
        this.loanObject.tenure_readable = tenure;
    }

    getInterest() {
        return this.loanObject.interest;
    }

    setInterest(interest) {
        this.loanObject.interest = interest;
    }

    getPurpose() {
        return this.loanObject.purpose_readable;
    }

    setPurpose(purpose) {
        this.loanObject.purpose_readable = purpose;
    }

    getNote() {
        return this.loanObject.note;
    }

    setNote(note) {
        this.loanObject.note = note;
    }

    getStatus() {
        return this.loanObject.status_readable;
    }

    setStatus(status) {
        this.loanObject.status_readable = status;
    }

    getDate() {
        return this.loanObject.date;
    }

    setDate(date) {
        this.loanObject.date = date;
    }

    isFundRaiser() {
        return this.loanObject.is_fund_raiser;
    }

    setFundRaiser(fundRaiser) {
        this.loanObject.is_fund_raiser = fundRaiser;
    }

    isPending() {
        return this.getStatus().toLowerCase().equals("pending");
    }

    isAwaiting() {
        return this.getStatus().toLowerCase().equals("awaiting");
    }

    isMine() {
        return this.loanObject.is_mine;
    }

    setMine(mine) {
        this.loanObject.is_mine = mine;
    }

    isGranted() {
        return this.loanObject.is_granted;
    }

    setGranted(granted) {
        this.loanObject.is_granted = granted;
    }

    isHasApplied() {
        return this.loanObject.has_applied;
    }

    setHasApplied(hasApplied) {
        this.loanObject.has_applied = hasApplied;
    }

    /**
     *
     * @returns {User}
     */
    getUser(): User {
        if (!(this.loanObject.user instanceof User))
            this.loanObject.user = new User(this.loanObject.user)
        return this.loanObject.user;
    }

    setUser(user: User) {
        this.loanObject.user = user;
    }

    setValues(loan) {
        this.loanObject = Utility.isString(loan) ? JSON.parse(loan) : (Utility.isObject(loan) ? loan : {});
    }
}

export default Loan;