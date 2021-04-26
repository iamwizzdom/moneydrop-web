import {Component} from "react";
import swal from "@sweetalert/with-react";
import Utility from "../../helpers/Utility";
import NoContent from "./NoContent";
import BankAccountLayout from "./BankAccountLayout";
import BankAccount from "../../models/BankAccount";

class BankAccountList extends Component {

    state = {
        selectedAccount: ''
    }

    selectAccount(account: BankAccount) {
        let accountID = account.getUuid();
        this.setState({selectedAccount: accountID});
        swal.setActionValue(accountID);
    }

    render() {
        let accounts = localStorage.getItem("bank-accounts");
        if (Utility.isEmpty(accounts)) return <NoContent title={`No Bank Account`}/>;
        accounts = JSON.parse(accounts);
        if (Utility.isEmpty(accounts)) return <NoContent title={`No Bank Account`}/>;
        return accounts.map((account, k) => {
            account = new BankAccount(account);
            return <BankAccountLayout key={k} bankAccount={account} selectAccount={true} selectedAccountID={this.state.selectedAccount} onClick={() => this.selectAccount(account)}/>
        });
    }
}

export default BankAccountList;