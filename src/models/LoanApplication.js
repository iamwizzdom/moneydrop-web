import Loan from "./Loan";
import User from "./User";
import Utility from "../helpers/Utility";

class LoanApplication {

    applicationObject = {};

    constructor(application) {
        this.setValues(application);
    }

    getId() {
        return this.applicationObject.id;
    }

    setId(id) {
        this.applicationObject.id = id;
    }

    getUserID() {
        return this.applicationObject.user_id;
    }

    setUserID(userID) {
        this.applicationObject.user_id = userID;
    }

    getReference() {
        return this.applicationObject.uuid;
    }

    setReference(reference) {
        this.applicationObject.uuid = reference;
    }

    getAmount() {
        return this.applicationObject.amount;
    }

    setAmount(amount) {
        this.applicationObject.amount = amount;
    }

    getRepaidAmount() {
        return this.applicationObject.repaid_amount;
    }

    setRepaidAmount(repaidAmount) {
        this.applicationObject.repaid_amount = repaidAmount;
    }

    getPayableAmount() {
        return this.applicationObject.amount_payable;
    }

    setPayableAmount(payableAmount) {
        this.applicationObject.amount_payable = payableAmount;
    }

    getUnpaidAmount() {
        return this.applicationObject.unpaid_amount;
    }

    setUnpaidAmount(unpaidAmount) {
        this.applicationObject.unpaid_amount = unpaidAmount;
    }

    getLoanID() {
        return this.applicationObject.loan_id;
    }

    setLoanID(loanID) {
        this.applicationObject.loan_id = loanID;
    }

    /**
     *
     * @returns {Loan}
     */
    getLoan() {
        if (!(this.applicationObject.loan instanceof Loan)) {
            this.applicationObject.loan = new Loan(this.applicationObject.loan);
        }
        return this.applicationObject.loan;
    }

    /**
     *
     * @param loan
     */
    setLoan(loan: Loan) {
        this.applicationObject.loan = loan;
    }

    /**
     *
     * @returns {User|*}
     */
    getApplicant() {
        if (!(this.applicationObject.applicant instanceof User)) {
            this.applicationObject.applicant = new User(this.applicationObject.applicant);
        }
        return this.applicationObject.applicant;
    }

    setApplicant(applicant: User) {
        this.applicationObject.applicant = applicant;
    }

    getDueDate() {
        return this.applicationObject.due_at;
    }

    setDueDate(dueDate) {
        this.applicationObject.due_at = dueDate;
    }

    getDueDateShort() {
        return this.applicationObject.due_date_short;
    }

    setDueDateShort(dueDateShort) {
        this.applicationObject.due_date_short = dueDateShort;
    }

    getDate() {
        return this.applicationObject.date;
    }

    setDate(date) {
        this.applicationObject.date = date;
    }

    getDateShort() {
        return this.applicationObject.date_short;
    }

    setDateShort(dateShort) {
        this.applicationObject.date_short = dateShort;
    }

    getDateGranted() {
        return this.applicationObject.granted_date_short || "Unavailable";
    }

    setDateGranted(dateGranted) {
        this.applicationObject.granted_date_short = dateGranted;
    }

    getStatus() {
        return this.applicationObject.status_readable;
    }

    setStatus(status) {
        this.applicationObject.status_readable = status;
    }

    isGranted() {
        return this.getStatus() === 'granted';
    }

    isAwaiting() {
        return this.getStatus() === 'awaiting';
    }

    isRejected() {
        return this.getStatus() === 'rejected';
    }

    isRepaid() {
        return this.applicationObject.is_repaid;
    }

    setRepaid(repaid) {
        this.applicationObject.is_repaid = repaid;
    }

    isReviewed() {
        return this.applicationObject.is_reviewed;
    }

    setReviewed(reviewed) {
        this.applicationObject.is_reviewed = reviewed;
    }

    isHasGranted() {
        return this.applicationObject.has_granted;
    }

    setHasGranted(hasGranted) {
        this.applicationObject.has_granted = hasGranted;
    }

    setValues(application) {
        this.applicationObject = Utility.isString(application) ? JSON.parse(application) : (Utility.isObject(application) ? application : {});
    }
}

export default LoanApplication;