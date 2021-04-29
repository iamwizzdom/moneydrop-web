import incomingDanger from '../assets/images/incoming-danger.svg';
import incomingInfo from '../assets/images/incoming-info.svg';
import incomingPending from '../assets/images/incoming-pending.svg';
import incomingSuccess from '../assets/images/incoming-success.svg';
import incomingWarning from '../assets/images/incoming-warning.svg';

import outgoingDanger from '../assets/images/outgoing-danger.svg';
import outgoingInfo from '../assets/images/outgoing-info.svg';
import outgoingPending from '../assets/images/outgoing-pending.svg';
import outgoingSuccess from '../assets/images/outgoing-success.svg';
import outgoingWarning from '../assets/images/outgoing-warning.svg';
import {AppConst} from "../constants";

class Utility {

    static isEmpty(data) {
        return ((typeof data === 'undefined') || (data === null) ||
            ((typeof data === "string") && (data.trim() === "" || data.trim() === " ")) ||
            (Array.isArray(data) && data.length <= 0) ||
            (typeof data === 'object' && Object.keys(data).length <= 0));
    }

    static wordCount(data) {
        return !this.isEmpty(data) ? data.split(" ").filter(d => !this.isEmpty(d)).length : 0;
    }

    static ucFirst(variable) {
        variable = variable.trim();
        return (variable.substring(0, 1).toUpperCase() +
            variable.substring(1, variable.length));
    }

    static sprintf() {
        let args_array = arguments, format = args_array[0];
        if (format.search("%s") < 0) throw new Error("sprintf expects %s as its format argument");
        let i = 0, size = (args_array.length - 1);
        if (size >= 100) throw new Error("sprintf arguments can't be greater than 100");
        for (; i < size; i++) format = format.replace("%s", args_array[(i + 1)]);
        return format;
    };

    static isString(variable) {
        return typeof variable === "string";
    }

    static isArray(variable) {
        return Array.isArray(variable)
    }

    static isObject(variable) {
        return variable !== null && typeof variable === "object";
    }

    static isNumeric(variable) {
        return (typeof variable === 'number' || (typeof variable === 'string' && !isNaN(variable)));
    }

    /**
     *
     * @param status
     * @param isIncoming
     * @returns {{badge: null, color: null, icon: null}}
     */
    static getTheme(status, isIncoming) {
        let theme = {icon: null, badge: null, color: null};
        switch (status.toLowerCase()) {
            case "inactive":
            case "pending":
                theme.icon = isIncoming ? incomingPending : outgoingPending;
                theme.badge = 'pending';
                theme.color = '#555961';
                break;
            case "awaiting":
            case "processing":
                theme.icon = isIncoming ? incomingWarning : outgoingWarning;
                theme.badge = 'warning';
                theme.color = '#F5A623';
                break;
            case "granted":
                theme.icon = isIncoming ? incomingInfo : outgoingInfo;
                theme.badge = 'info';
                theme.color = '#36a3f7';
                break;
            case "repaid":
            case "completed":
            case "successful":
                theme.icon = isIncoming ? incomingSuccess : outgoingSuccess;
                theme.badge = 'success';
                theme.color = '#0B9437';
                break;
            default:
                theme.icon = isIncoming ? incomingDanger : outgoingDanger;
                theme.badge = 'danger';
                theme.color = '#F66E84';
                break;
        }
        return theme;
    }

    static format(amount, decimals = 2, style = 'currency', currency = 'NGN') {
        return !isNaN(amount) && amount.toLocaleString(`en-${currency.substr(0, 2)}`, {
            style: style,
            currency,
            maximumFractionDigits: decimals
        });
    }

    static getSearchParameters(url) {
        let start = url.indexOf('?'), params = (start > -1 ? url.substr((start + 1)) : '');
        return params != null && params !== "" ? Utility.transformToAssocArray(params) : {};
    };

    static transformToAssocArray(paramStr) {
        let params = {};
        let paramsArr = paramStr.split("&");
        for (let i = 0; i < paramsArr.length; i++) {
            let tmpArr = paramsArr[i].split("=");
            params[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1]);
        }
        return params;
    };

    static serialize(object) {
        let list = [], x;
        for (x in object) {
            if (object.hasOwnProperty(x)) {
                list[list.length] = `${encodeURIComponent(x)}=${encodeURIComponent(!Utility.isEmpty(object[x]) ?
                    ((Utility.isObject(object[x]) || Utility.isArray(object[x])) ? JSON.stringify(object[x]) : object[x]) : "")}`;
            }
        }
        return list.join('&');
    };

    static serializeObject(object) {
        let message = "", count = 0;
        for (let key in object) {
            if (!object.hasOwnProperty(key)) continue;
            let value = object[key];
            if (Utility.isEmpty(value)) continue;
            message += (!Utility.isEmpty(message) ? "\n" : "") + (++count + ". " + value);
        }
        return message;
    }

    static addPerPage(url) {
        let query = Utility.getSearchParameters(url), start = url.indexOf('?');
        query.perPage = AppConst.PAGINATION_PER_PAGE;
        return `${start > -1 ? url.substr(0, start) : url}?${Utility.serialize(query)}`;
    };
}

export default Utility;