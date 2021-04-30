import Utility from "../helpers/Utility";

class Notification {

    noticeObject = {};

    constructor(noticeObject) {
        this.setValues(noticeObject);
    }

    getId() {
        return this.noticeObject.id;
    }

    setId(id) {
        this.noticeObject.id = id;
    }

    getReference() {
        return this.noticeObject.uuid;
    }

    setReference(reference) {
        this.noticeObject.uuid = reference;
    }

    getMessage() {
        return this.noticeObject.message;
    }

    setMessage(message) {
        this.noticeObject.message = message;
    }

    getImage() {
        return this.noticeObject.image;
    }

    setImage(image) {
        this.noticeObject.image = image;
    }

    getActivity() {
        return this.noticeObject.activity;
    }

    setActivity(activity) {
        this.noticeObject.activity = activity;
    }

    getPayload() {
        return this.noticeObject.payload;
    }

    setPayload(payload) {
        this.noticeObject.payload = payload;
    }

    getDateTime() {
        return this.noticeObject.date_time;
    }

    setDateTime(dateTime) {
        this.noticeObject.date_time = dateTime;
    }

    setValues(noticeObject) {
        this.noticeObject = Utility.isString(noticeObject) ? JSON.parse(noticeObject) : (Utility.isObject(noticeObject) ? noticeObject : {});
    }
}

export default Notification;