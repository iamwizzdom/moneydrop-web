import Utility from "../helpers/Utility";

class State {

    stateObject = {};

    constructor(state) {
        this.stateObject = Utility.isString(state) ? JSON.parse(state) : (Utility.isObject(state) ? state : {});
    }

    getId() {
        return this.stateObject.id;
    }

    setId(id) {
        this.stateObject.id = id;
    }

    getCountryId() {
        return this.stateObject.country_id;
    }

    setCountryId(countryId) {
        this.stateObject.country_id = countryId;
    }

    getName() {
        return this.stateObject.name;
    }

    setName(name) {
        this.stateObject.name = name;
    }

    getIso3166_2() {
        return this.stateObject.iso3166_2;
    }

    setIso3166_2(iso3166_2) {
        this.stateObject.iso3166_2 = iso3166_2;
    }
}

export default State;