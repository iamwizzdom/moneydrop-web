import Utility from "../helpers/Utility";

class BankAccount {

    accountObject = {};

    constructor(account) {
        this.setValues(account);
    }

    getId() {
        return this.accountObject.id;
    }

    setId(id) {
        this.accountObject.id = id;
    }

    getUuid() {
        return this.accountObject.uuid;
    }

    setUuid(uuid) {
        this.accountObject.uuid = uuid;
    }

    getAccountName() {
        return this.accountObject.account_name;
    }

    setAccountName(accountName) {
        this.accountObject.account_name = accountName;
    }

    getBankName() {
        return this.accountObject.bank_name;
    }

    setBankName(bankName) {
        this.accountObject.bank_name = bankName;
    }

    getAccountNumber() {
        return this.accountObject.account_number;
    }

    setAccountNumber(accountNumber) {
        this.accountObject.account_number = accountNumber;
    }

    getRecipientCode() {
        return this.accountObject.recipient_code;
    }

    setRecipientCode(recipientCode) {
        this.accountObject.recipient_code = recipientCode;
    }

    setValues(account) {
        this.accountObject = Utility.isString(account) ? JSON.parse(account) : (Utility.isObject(account) ? account : {});
    }
}

export default BankAccount;