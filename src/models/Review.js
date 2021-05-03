import Utility from "../helpers/Utility";
import User from "./User";
import LoanApplication from "./LoanApplication";

class Review {

    reviewObject = {};

    constructor(reviewObject) {
        this.setValues(reviewObject);
    }

    getId() {
        return this.reviewObject.id;
    }

    setId(id) {
        this.reviewObject.id = id;
    }

    getUuid() {
        return this.reviewObject.uuid;
    }

    setUuid(uuid) {
        this.reviewObject.uuid = uuid;
    }

    getReview() {
        return this.reviewObject.review;
    }

    setReview(review) {
        this.reviewObject.review = review;
    }

    getDate() {
        return this.reviewObject.date;
    }

    setDate(date) {
        this.reviewObject.date = date;
    }

    getDateFormatted() {
        return this.reviewObject.date_formatted;
    }

    setDateFormatted(dateFormatted) {
        this.reviewObject.date_formatted = dateFormatted;
    }

    getUser() {
        if (!Utility.isEmpty(this.reviewObject.user) && !(this.reviewObject.user instanceof User))
            this.reviewObject.user = new User(this.reviewObject.user.userObject || this.reviewObject.user);
        return this.reviewObject.user;
    }

    getReviewer() {
        if (!Utility.isEmpty(this.reviewObject.reviewer) && !(this.reviewObject.reviewer instanceof User))
            this.reviewObject.reviewer = new User(this.reviewObject.reviewer.userObject || this.reviewObject.reviewer);
        return this.reviewObject.reviewer;
    }

    getLoanApplication() {
        if (!Utility.isEmpty(this.reviewObject.application) && !(this.reviewObject.application instanceof LoanApplication))
            this.reviewObject.application = new LoanApplication(this.reviewObject.application.applicationObject || this.reviewObject.application);
        return this.reviewObject.application;
    }

    setValues(reviewObject) {
        this.reviewObject = Utility.isString(reviewObject) ? JSON.parse(reviewObject) : (Utility.isObject(reviewObject) ? reviewObject : {});
    }
}

export default Review;