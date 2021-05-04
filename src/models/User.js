import {AppConst, UrlConst} from "../constants";
import male from '../assets/images/male-user.svg';
import female from '../assets/images/female-user.svg';
import unisex from '../assets/images/unisex.svg';
import Utility from "../helpers/Utility";
import Country from "./Country";
import State from "./State";

class User {

    userObject = {};

    constructor(user) {
        this.setValues(user);
    }

    getId() {
        return this.userObject.id;
    }

    setId(id) {
        this.userObject.id = id;
    }

    getUuid() {
        return this.userObject.uuid;
    }

    setUuid(uuid) {
        this.userObject.uuid = uuid;
    }

    getFirstname() {
        return this.userObject.firstname;
    }

    setFirstname(firstname) {
        this.userObject.firstname = firstname;
    }

    getMiddlename() {
        return this.userObject.middlename;
    }

    setMiddlename(middlename) {
        this.userObject.middlename = middlename;
    }

    getLastname() {
        return this.userObject.lastname;
    }

    setLastname(lastname) {
        this.userObject.lastname = lastname;
    }

    getEmail() {
        return this.userObject.email;
    }

    setEmail(email) {
        this.userObject.email = email;
    }

    getPhone() {
        return this.userObject.phone;
    }

    setPhone(phone) {
        this.userObject.phone = phone;
    }

    getBvn() {
        return this.userObject.bvn;
    }

    setBvn(bvn) {
        this.userObject.bvn = bvn;
    }

    getDob() {
        return this.userObject.dob;
    }

    setDob(dob) {
        this.userObject.dob = dob;
    }

    getGender() {
        return this.userObject.gender;
    }

    setGender(gender) {
        this.userObject.gender = gender;
    }

    getAddress() {
        return this.userObject.address;
    }

    setAddress(address) {
        this.userObject.address = address;
    }

    /**
     *
     * @returns {*}
     */
    getCountry(): Country {
        if (this.userObject.country && !(this.userObject.country instanceof Country))
            this.userObject.country = new Country(this.userObject.country.countryObject || this.userObject.country)
        return this.userObject.country;
    }

    setCountry(country: Country) {
        this.userObject.country = country;
    }

    /**
     *
     * @returns {*}
     */
    getState(): State {
        if (this.userObject.state && !(this.userObject.state instanceof State))
            this.userObject.state = new State(this.userObject.state.stateObject || this.userObject.state)
        return this.userObject.state;
    }

    /**
     *
     * @param state
     */
    setState(state: State) {
        this.userObject.state = state;
    }

    getPicture() {
        return this.userObject.picture;
    }

    getPictureUrl() {
        return (UrlConst.BASE_URL + "/" + this.getPicture());
    }

    getDefaultPicture() {
        return this.getGender() === AppConst.MALE ? male : (this.getGender() === AppConst.FEMALE ? female : unisex);
    }

    setPicture(picture) {
        this.userObject.picture = picture;
    }

    getRating() {
        return this.userObject.rating;
    }

    setRating(rating) {
        this.userObject.rating = rating;
    }

    getStatus() {
        return this.userObject.status;
    }

    setStatus(status) {
        this.userObject.status = status;
    }

    getToken() {
        return this.userObject.token;
    }

    setToken(token) {
        this.userObject.token = token;
    }

    getObject() {
        return this.userObject;
    }

    isMe() {
        const user = new User(localStorage.getItem("user"));
        return this.getUuid() === user.getUuid();
    }

    setValues(user) {
        this.userObject = Utility.isString(user) ? JSON.parse(user) : (Utility.isObject(user) ? user : {});
    }

    update() {
        if (this.isMe()) localStorage.setItem('user', JSON.stringify(this.userObject));
    }
}

export default User;