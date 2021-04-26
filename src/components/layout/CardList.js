import {Component} from "react";
import Card from "../../models/Card";
import swal from "@sweetalert/with-react";
import Utility from "../../helpers/Utility";
import NoContent from "./NoContent";
import CardLayout from "./CardLayout";

class CardList extends Component {

    state = {
        selectedCard: ''
    }

    selectCard(card: Card) {
        let cardID = card.getUuid();
        this.setState({selectedCard: cardID});
        swal.setActionValue(cardID);
    }

    render() {
        let cards = localStorage.getItem("cards");
        if (Utility.isEmpty(cards)) return <NoContent title={`No Card`}/>;
        cards = JSON.parse(cards);
        if (Utility.isEmpty(cards)) return <NoContent title={`No Card`}/>;
        return cards.map((card, k) => {
            card = new Card(card);
            return <CardLayout key={k} card={card} selectCard={true} selectedCardID={this.state.selectedCard} onClick={() => this.selectCard(card)}/>
        });
    }
}

export default CardList;