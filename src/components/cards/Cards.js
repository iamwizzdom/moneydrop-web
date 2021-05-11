import React, {Component} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {AppConst, UrlConst} from "../../constants";
import {CardAction} from "../../actions";
import {connect} from "react-redux";
import Utility from "../../helpers/Utility";
import NoContent from "../layout/NoContent";
import CardModel from "../../models/Card";
import CardShimmer from "../layout/CardShimmer";
import CardLayout from "../layout/CardLayout";
import {RavePaymentButton, RaveProvider} from "react-ravepayment";
import User from "../../models/User";
import {v4} from "uuid";
import swal from "@sweetalert/with-react";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import remove from "../../assets/images/remove.svg";

class Cards extends Component {

    state = {
        card: null,
        cards: [],
        onSuccess: false,
        showRemoveCard: false
    };

    componentDidMount() {
        let cards = localStorage.getItem('cards');
        if (Utility.isEmpty(cards) || Utility.isEmpty(JSON.parse(cards))) {
            const {dispatch} = this.props;
            dispatch(CardAction.fetchCards());
        } else {
            this.setState({cards: JSON.parse(cards)});
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, verifyCard, fetchCards, removeCard} = this.props;

        const {response} = {...{response: {card: null}}, ...verifyCard.data};

        const {response: cards} = {...{response: []}, ...fetchCards.data};


        if (cards.length > 0) {
            this.setState({cards});
            fetchCards.data = {};
            localStorage.setItem('cards', JSON.stringify(cards));
        }

        if (response.card) {
            let cards = [response.card, ...this.state.cards];
            this.setState({cards});
            verifyCard.data.response = {};
            localStorage.setItem('cards', JSON.stringify(cards));
        }

        if (verifyCard.data.message) {
            swal({
                title: verifyCard.data.title,
                text: verifyCard.data.message,
                icon: (verifyCard.data.status ? `success` : `error`),
                button: "Ok",
            });
            verifyCard.data.message = null;
        }


        const {status, message} = {status: null, message: null, ...removeCard.data};

        if (status !== null && message) {
            if (status) this.detachCard(this.state.card);
            swal(message, {icon: status ? "success" : "error"});
            removeCard.data = {};
        }

        if (this.state.showRemoveCard) {
            swal(<span className={`color-accent`}>Are you sure you want to remove this card?</span>, {
                icon: remove,
                buttons: {
                    cancel: "No, cancel",
                    confirm: {
                        text: "Yes, proceed",
                        closeModal: false,
                    }
                },
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    this.setState({showRemoveCard: false}, () => {
                        dispatch(CardAction.removeCard(this.state.card.getUuid()));
                    });
                }
            });
        }
    }

    detachCard = (card: CardModel) => {
        if (!card) return;
        let cards = this.state.cards.filter(card1 => card?.getId() !== (new CardModel(card1))?.getId());
        this.setState({cards}, () => {
            localStorage.setItem('cards', JSON.stringify(cards));
        });
    }

    setCardToRemove = (card) => {
        this.setState({card, showRemoveCard: true});
    }

    render() {

        const {fetchCards, verifyCard, dispatch} = this.props;
        let {cards} = this.state;

        if (fetchCards.requesting && Utility.isEmpty(cards)) {
            cards = [1, 2, 3, 4, 5];
        }

        const user = new User();
        const reference = v4();
        const config = {
            txref: reference,
            customer_firstname: user.getFirstname(),
            customer_lastname: user.getLastname(),
            customer_email: user.getEmail(),
            customer_phone: user.getPhone(),
            amount: 50,
            PBFPubKey: AppConst.FLUTTERWAVE_PUBKEY,
            production: AppConst.LIVE,
            onSuccess: () => {
                this.setState({onSuccess: true}, () => {
                    document.getElementById('web-close-btn').click();
                });
            },
            onClose: () => {
                if (this.state.onSuccess) {
                    this.setState({onSuccess: false});
                    dispatch(CardAction.verifyCard({reference}));
                }
            }
        };

        return <>
            <Row>
                <Col md={6}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Cards
                    </h4>
                    <p>Your reusable cards on {AppConst.APP_NAME}</p>
                </Col>
                <Col md={6} className={`mt-3 mb-3 loan-type-btn-aligner`}>
                    <RaveProvider
                        custom_logo={`${UrlConst.BASE_URL}/storage/system/logo.png`}
                        payment_options={`card`}
                        custom_title={`MoneyDrop card test charge`}
                        custom_description={`MoneyDrop card test charge`}
                        {...config}>
                        <RavePaymentButton className={`btn btn-primary pl-4 pr-4 m-1 my-rounded`}>
                            {verifyCard.requesting ? <Spinner animation="border" variant="light"/> : 'Add new'}
                        </RavePaymentButton>
                    </RaveProvider>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(cards) ? <Row className={`underline-grandchildren`}>
                                {cards.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <CardShimmer key={k}/>;

                                    return <CardLayout key={k} setCardToRemove={this.setCardToRemove} card={new CardModel(v)}/>;
                                })}
                            </Row> : <NoContent title={`No Card`}/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        fetchCards: state.fetchCards,
        verifyCard: state.verifyCard,
        removeCard: state.removeCard
    }
}

export default connect(mapStateToProps)(Cards)