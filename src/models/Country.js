import Utility from "../helpers/Utility";

class Country {

    countryObject = {};

    constructor(country) {
        this.countryObject = Utility.isString(country) ? JSON.parse(country) : (Utility.isObject(country) ? country : {});
    }

    getId() {
        return this.countryObject.id;
    }

    setId(id) {
        this.countryObject.id = id;
    }

    getName() {
        return this.countryObject.name;
    }

    setName(name) {
        this.countryObject.name = name;
    }

    getRegion() {
        return this.countryObject.region;
    }

    setRegion(region) {
        this.countryObject.region = region;
    }

    getDialCode() {
        return this.countryObject.dial_code;
    }

    setDialCode(dialCode) {
        this.countryObject.dial_code = dialCode;
    }

    getIso() {
        return this.countryObject.iso;
    }

    setIso(iso) {
        this.countryObject.iso = iso;
    }

    getIso3() {
        return this.countryObject.iso3;
    }

    setIso3(iso3) {
        this.countryObject.iso3 = iso3;
    }

    getCurrencyName() {
        return this.countryObject.currency_name;
    }

    setCurrencyName(currencyName) {
        this.countryObject.currency_name = currencyName;
    }

    getCurrencyCode() {
        return this.countryObject.currency_code;
    }

    setCurrencyCode(currencyCode) {
        this.countryObject.currency_code = currencyCode;
    }

    getObject() {
        return this.countryObject;
    }
}

export default Country;