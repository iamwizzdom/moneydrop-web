import React, {Component} from "react";
import {Card, Col, Nav, Row, Tab} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {Link, Redirect} from "react-router-dom";
import arrow from "../../assets/images/arrow-accent.svg";
import userIcon from "../../assets/images/user-icon.svg";
import settings from "../../assets/images/settings.svg";
import camera from "../../assets/images/camera.svg";
import ReactStars from "react-rating-stars-component";
import Utility from "../../helpers/Utility";
import User from "../../models/User";
import {connect} from "react-redux";
import UserInfo from "./layouts/UserInfo";
import Settings from "./layouts/Settings";
import EditNameLayout from "./layouts/edit/EditNameLayout";
import ReactDOM from "react-dom";
import swal from "@sweetalert/with-react";
import EditPhoneLayout from "./layouts/edit/EditPhoneLayout";
import {ProfileAction} from "../../actions/profile";

class Profile extends Component {

    state = {
        user: null,
        mounted: false,
        currentTab: 'user-info',
        editType: '',
        showEditModal: false,
    }

    componentDidMount() {
        const {state} = this.props.location;
        const mState = {
            ...this.state,
            ...state,
            mounted: true
        };

        if (mState && !(mState.user instanceof User) && Utility.isObject(mState.user)) {
            mState.user = new User(mState.user.userObject);
        }

        if (!(mState?.user instanceof User)) {
            mState.user = new User(localStorage.getItem('user'));
        }

        this.setState({...mState});
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, profileInfoUpdate} = this.props;

        if (profileInfoUpdate.data.message) {
            if (profileInfoUpdate.data.hasOwnProperty("errors") && Object.keys(profileInfoUpdate.data.errors).length > 0) {
                profileInfoUpdate.data.message = Utility.serializeObject(profileInfoUpdate.data.errors);
            }
            swal({
                title: profileInfoUpdate.data.title,
                text: profileInfoUpdate.data.message,
                icon: (profileInfoUpdate.data.status ? `success` : `error`),
                button: "Ok",
            });
            profileInfoUpdate.data.message = null;
            if (profileInfoUpdate.data.response?.user) {
                this.setState({user: new User(profileInfoUpdate.data.response.user)}, () => {
                    this.state.user.update();
                });
            }
        }

        if (this.state.showEditModal) {

            let wrapper = document.createElement('div');
            ReactDOM.render(this.getEditLayout(this.state.editType, this.state.user), wrapper);

            swal({
                content: wrapper,
                buttons: {
                    cancel: "Cancel",
                    confirm: {
                        text: "Update",
                        closeModal: false
                    }
                },
            }).then((data) => {

                if (!data) {
                    this.setState({showEditModal: false, editType: ''});
                    return;
                }

                let type = this.state.editType;
                this.setState({showEditModal: false, editType: ''}, () => {
                    dispatch(ProfileAction.updateInfo(JSON.parse(data), type));
                });

            });
        }
    }

    onNavSelected = (key) => {
        this.setState({currentTab: key});
    };

    /**
     *
     * @param type
     * @param user
     * @returns {JSX.Element|null}
     */
    getEditLayout = (type, user: User) => {
        switch (type) {
            case "name":
                return <EditNameLayout firstname={user.getFirstname()} middlename={user.getMiddlename()} lastname={user.getLastname()}/>
            case 'phone':
                return <EditPhoneLayout phone={user.getPhone()}/>
            default:
                break;
        }
        return null;
    }

    showEditModal = (type) => {
        this.setState({showEditModal: true, editType: type});
    }

    render() {

        const {location} = this.props;

        let {mounted, user, from} = this.state;

        if (!mounted) return null;

        if (mounted && !(user instanceof User)) {
            return <Redirect to={{ pathname: from?.pathname || '/', state: {user}, header: {status: 'warning', message: 'Invalid user data'}}} />;
        }

        const isMe = user.isMe();

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        User Profile
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col>
                    <Card border="light" className={`p-3 border-radius-10`}>
                        <Card.Body>
                            <Row>
                                <Col xl={2} lg={2} md={3} sm={3} xs={4} className={`p-0`}>
                                    <div style={{width: 95, height: 95}} className={`position-relative m-auto`}>
                                        <img
                                            src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                                            style={{objectFit: 'cover'}} alt={`user`}
                                            className={`w-100 h-100 rounded-circle border-accent background-accent-light p-2`}/>
                                        {user.isMe() && <div className={`rounded-circle background-accent position-absolute cursor-pointer`}
                                              style={{width: 25, height: 25, top: 60, left: 70}}>
                                            <img src={camera} alt={`nav-icon`} className={`img-fluid item-center`}/>
                                        </div>}
                                    </div>
                                </Col>
                                <Col xl={10} lg={10} md={9} sm={9} xs={8}>
                                    <h5 className={`mt-1`}>{user.getFirstname()} {user.getLastname()}</h5>
                                    <p className={`small m-0 mb-1`}>{user.getEmail()}</p>
                                    <Link to={{pathname: `/user/reviews`, state: {user: user, from: location}}} className={`color-accent`}>View reviews <img src={arrow} className={`ml-1 mb-1`} alt={`icon`}/> </Link>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        isHalf={true}
                                        value={user.getRating()}
                                        color="#d1d1d1"
                                        activeColor="#e04805"
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10`}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="user-info" onSelect={this.onNavSelected}>
                        <Card.Header className={`bg-white border-0`}>
                            <Row>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <h5 className={`mt-3`}>{this.state.currentTab === 'user-info' ? `User Information` : `Settings`}</h5>
                                </Col>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                                    <Nav className={`justify-content-end`} variant="pills">
                                        <div className={`d-flex my-rounded`} style={{backgroundColor: '#f5f5f5'}}>
                                            <Nav.Item className={`my-tab-nav-item m-2`}>
                                                <Nav.Link className={`my-rounded`} eventKey="user-info">
                                                    <img src={userIcon} width={20} alt={`nav-icon`}/>
                                                </Nav.Link>
                                            </Nav.Item>
                                            {isMe && <Nav.Item className={`my-tab-nav-item m-2`}>
                                                <Nav.Link className={`my-rounded`} eventKey="settings">
                                                    <img src={settings} width={20} alt={`nav-icon`}/>
                                                </Nav.Link>
                                            </Nav.Item>}
                                        </div>
                                    </Nav>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Content>
                                <Tab.Pane eventKey="user-info" className={`pl-3`}>
                                    <UserInfo user={user} isMe={isMe} showEditModal={this.showEditModal}/>
                                </Tab.Pane>
                                {isMe && <Tab.Pane eventKey="settings" className={`pl-3`}>
                                    <Settings/>
                                </Tab.Pane>}
                            </Tab.Content>
                        </Card.Body>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        profileInfoUpdate: state.profileInfoUpdate
    }
}

export default connect(mapStateToProps)(Profile)