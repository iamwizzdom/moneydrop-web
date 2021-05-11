import React, {Component} from "react";
import {Button, Card, Col, Modal, Nav, Row, Spinner, Tab} from "react-bootstrap";
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
import swal from "@sweetalert/with-react";
import EditPhoneLayout from "./layouts/edit/EditPhoneLayout";
import {ProfileAction} from "../../actions/profile";
import EditEmailLayout from "./layouts/edit/EditEmailLayout";
import EditGenderLayout from "./layouts/edit/EditGenderLayout";
import EditDobLayout from "./layouts/edit/EditDobLayout";
import {ImportAction} from "../../actions/import";
import EditCountryLayout from "./layouts/edit/EditCountryLayout";
import EditStateLayout from "./layouts/edit/EditStateLayout";
import EditAddressLayout from "./layouts/edit/EditAddressLayout";
import {AuthAction} from "../../actions";
import VerifyData from "./layouts/edit/VerifyData";
import ChangePasswordLayout from "./layouts/edit/ChangePasswordLayout";
import capture from "../../assets/images/capture.svg";
import gallery from "../../assets/images/gallery.svg";
import deletePhoto from "../../assets/images/delete-photo.svg";
import remove from "../../assets/images/remove.svg";
import close from "../../assets/images/close.svg";
import Webcam from "react-webcam";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Message from "../layout/Message";
import imageCompression from "browser-image-compression";

class Profile extends Component {

    state = {
        user: null,
        mounted: false,
        currentTab: 'user-info',
        editType: '',
        editLayout: '',
        imageSrc: '',
        showProfilePic: false,
        showEditModal: false,
        showRemovePicture: false,
        pictureMessage: {message: '', status: ''}
    }

    webcamRef;

    componentDidMount() {
        this.webcamRef = React.createRef();
        const {dispatch, location} = this.props;
        const {state} = location;
        const mState = {
            ...this.state,
            ...state,
            mounted: true
        };

        if (mState && !(mState.user instanceof User) && Utility.isObject(mState.user)) {
            mState.user = new User(mState.user.userObject);
        }

        if (!(mState?.user instanceof User)) {
            mState.user = new User();
        }

        this.setState({...mState}, () => {
            let countries = localStorage.getItem('countries');
            let states = localStorage.getItem('states');
            if (Utility.isEmpty(countries)) dispatch(ImportAction.importCountries());
            if (Utility.isEmpty(states)) dispatch(ImportAction.importStates());
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, verifyRequest, verifyAuth, importCountries, importStates, profilePictureUpdate, profileRemoveUpdate,
            profileRateUpdate, profileInfoUpdate, forceUpdateHandler, setHeaderMessage} = this.props;

        if (importCountries.data.status) {
            localStorage.setItem('countries', JSON.stringify(importCountries.data.response?.countries));
        }

        if (importStates.data.status) {
            localStorage.setItem('states', JSON.stringify(importStates.data.response?.states));
        }

        if (profileRateUpdate.data.message) {
            setHeaderMessage(profileRateUpdate.data.message, profileRateUpdate.data.status ? 'success' : 'error');
            profileRateUpdate.data.message = null;
            if (profileRateUpdate.data.status) {
                this.state.user.setRating(profileRateUpdate.data.response.rating);
                this.props.history.replace({
                    ...this.props.location,
                    state: {
                        ...this.props.location.state,
                        user: this.state.user
                    }
                });
            }
        }

        if (profileInfoUpdate.data.status || (profileInfoUpdate.data.status === false && Utility.isEmpty(profileInfoUpdate.data.errors))) {

            let status = profileInfoUpdate.data.status;
            profileInfoUpdate.data.status = null;

            this.hideEditModal(() => {

                swal({
                    title: profileInfoUpdate.data.title,
                    text: profileInfoUpdate.data.message,
                    icon: (status ? `success` : `error`),
                    button: "Ok",
                });

                if (profileInfoUpdate.data.response?.user) {
                    this.setState({user: new User(profileInfoUpdate.data.response.user)}, () => {
                        this.state.user.update();
                        forceUpdateHandler();
                    });
                }

            });
        }

        if (profileRemoveUpdate.data.message) {

            let status = profileRemoveUpdate.data.status;
            let message = profileRemoveUpdate.data.message;
            profileRemoveUpdate.data.message = null;

            this.hideEditModal(() => {

                swal({
                    title: profileRemoveUpdate.data.title,
                    text: message,
                    icon: (status ? `success` : `error`),
                    button: "Ok",
                });

                if (profileRemoveUpdate.data.response?.user) {
                    this.setState({user: new User(profileRemoveUpdate.data.response.user)}, () => {
                        this.state.user.update();
                        forceUpdateHandler();
                    });
                }

            });
        }

        if (profilePictureUpdate.data.message) {

            let status = profilePictureUpdate.data.status;
            let message = profilePictureUpdate.data.message;
            profilePictureUpdate.data.message = null;

            if (profilePictureUpdate.data.hasOwnProperty("errors") && Object.keys(profilePictureUpdate.data.errors).length > 0) {
                message = Utility.serializeObject(profilePictureUpdate.data.errors);
            }

            this.hideEditModal(() => {

                swal({
                    title: profilePictureUpdate.data.title,
                    text: message,
                    icon: (status ? `success` : `error`),
                    button: "Ok",
                });

                if (profilePictureUpdate.data.response?.user) {
                    this.setState({user: new User(profilePictureUpdate.data.response.user)}, () => {
                        this.state.user.update();
                        forceUpdateHandler();
                    });
                }

            });
        }

        if (verifyRequest.data.status || (verifyRequest.data.status === false && Utility.isEmpty(verifyRequest.data.errors))) {

            let status = verifyRequest.data.status;
            verifyRequest.data.status = null;

            this.hideEditModal(() => {

                swal({
                    title: verifyRequest.data.title,
                    text: verifyRequest.data.message,
                    icon: (status ? `success` : `error`),
                    button: "Ok",
                }).then(() => {
                    if (status && verifyRequest.data.code === 200) this.showEditModal(this.state.editType, 'otp')
                });

            });
        }

        if (verifyAuth.data.status || (verifyAuth.data.status === false && Utility.isEmpty(verifyAuth.data.errors))) {

            let status = verifyAuth.data.status;
            verifyAuth.data.status = null;

            this.hideEditModal(() => {

                swal({
                    title: verifyAuth.data.title,
                    text: verifyAuth.data.message,
                    icon: (status ? `success` : `error`),
                    button: "Ok",
                });

                if (status) {
                    const {user, editType: type } = this.state;
                    if (type === 'email') user.setEmail(verifyRequest.data[type]);
                    else user.setPhone(verifyRequest.data[type]);
                    user.update();
                    this.setState({user});
                }

            });
        }

        if (this.state.showRemovePicture) {

            if (this.state.showEditModal) this.hideEditModal(() => {
                swal(<span className={`color-accent`}>Are you sure you want to remove your photo?</span>, {
                    icon: remove,
                    buttons: {
                        cancel: "No, cancel",
                        confirm: "Yes, proceed"
                    },
                    dangerMode: true,
                }).then((willDo) => {
                    this.setState({showRemovePicture: false}, () => {
                        if (willDo) dispatch(ProfileAction.removePhoto());
                    });
                });
            })
        }
    }

    setPictureMessage = (message, status) => {
        this.setState({pictureMessage: {message, status}});
    }

    onNavSelected = (key) => {
        this.setState({currentTab: key});
    };

    submit = (state, type) => {
        const {dispatch} = this.props;
        if (type === 'phone' || type === 'email') dispatch(AuthAction.verifyRequest(state, type));
        else dispatch(ProfileAction.updateInfo(state, type));
    }

    verify = (state, type) => {
        const {dispatch} = this.props;
        dispatch(AuthAction.verify(state, type));
    }

    getEditTitle = (type) => {
        switch (type) {
            case "name":
                return "Update Name";
            case 'phone':
                return "Update Phone";
            case 'email':
                return "Update Email";
            case 'gender':
                return "Update Gender";
            case 'dob':
                return "Update Date of Birth";
            case 'country':
                return "Update Country";
            case 'state':
                return "Update State";
            case 'address':
                return "Update Address";
            case 'password':
                return "Change Password";
            case 'otp':
                return "Verification";
            case 'web-cam':
                return "Take Photo";
            default:
                break;
        }
        return null;
    }

    /**
     *
     * @param type
     * @param layout
     * @param user
     * @returns {JSX.Element|null}
     */
    getEditLayout = (type, layout, user: User) => {
        const {profileInfoUpdate, verifyRequest, verifyAuth} = this.props;
        switch (layout) {
            case "name":
                return <EditNameLayout firstname={user.getFirstname()} middlename={user.getMiddlename()} lastname={user.getLastname()}
                                       profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'phone':
                return <EditPhoneLayout phone={user.getPhone()} verifyRequest={verifyRequest} submit={this.submit} type={type}/>
            case 'email':
                return <EditEmailLayout email={user.getEmail()} verifyRequest={verifyRequest} submit={this.submit} type={type}/>
            case 'gender':
                return <EditGenderLayout gender={user.getGender()} profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'dob':
                return <EditDobLayout dob={user.getDob()} profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'country':
                return <EditCountryLayout country={user.getCountry()?.getId()} profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'state':
                return <EditStateLayout country={user.getCountry()?.getId()} state={user.getState()?.getId()} profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'address':
                return <EditAddressLayout address={user.getAddress()} profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'password':
                return <ChangePasswordLayout profileInfoUpdate={profileInfoUpdate} submit={this.submit} type={type}/>
            case 'otp':
                return <VerifyData verifyRequest={verifyRequest} verifyAuth={verifyAuth} data={verifyRequest.data[type]} countDownTime={verifyRequest.data.expire}
                                   oldData={type === 'email' ? user.getEmail() : user.getPhone()} submit={this.verify} resend={this.submit} type={type} />
            case 'picture':
                return <Nav variant="pills" className="flex-column">
                    <Nav.Item className={`my-nav-item pl-2 pb-3 m-0 underline cursor-pointer`} onClick={() => this.showEditModal('picture', 'web-cam')}>
                        <img src={capture} width={19} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Take Photo
                    </Nav.Item>
                    <Nav.Item className={`my-nav-item pl-2 pt-3 pb-3 m-0 underline cursor-pointer`} onClick={this.selectImage}>
                        <img src={gallery} width={19} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Choose from Device
                    </Nav.Item>
                    <Nav.Item className={`my-nav-item pl-2 pt-3 pb-3 m-0 cursor-pointer`} onClick={() => this.setState({showRemovePicture: true})}>
                        <img src={deletePhoto} width={18} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                        Remove Photo
                    </Nav.Item>
                </Nav>;
            case 'web-cam':
                return <>
                    <Message header={this.state.pictureMessage} onClose={() => {this.setState({pictureMessage: {}})}} {...this.props}/>
                    {this.state.imageSrc ? <img className={`img-fluid w-100 h-100`} src={this.state.imageSrc} alt={`captured-pic`}/> : <Webcam
                        audio={false}
                        width={'100%'}
                        height={'auto'}
                        ref={this.webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{width: window.screen.width, height: 350, facingMode: "user"}}
                    />}
                    <div className={`text-right`}>
                        {this.state.imageSrc ? <>
                            <Button variant="outline-secondary" type="button" onClick={() => this.setState({imageSrc: ''})}
                                    className={`font-size-16 min-height-48 mt-4 m-1`}>Retake</Button>
                            <Button variant="primary" type="button" className={`font-size-16 min-height-48 mt-4 m-1 border-radius-standard`}
                                    onClick={() => {
                                        if (this.state.imageSrc) {
                                            let image = this.state.imageSrc;
                                            this.hideEditModal(() => {
                                                this.uploadFile(image);
                                            });
                                        } else this.setPictureMessage('No image to upload.', 'error');
                            }}>Upload</Button>
                        </> : <>
                            <Button variant="outline-secondary" type="button" className={`font-size-16 min-height-48 mt-4 m-1`} onClick={() => this.hideEditModal()} >Cancel</Button>
                            <Button variant="primary" type="button" className={`font-size-16 min-height-48 mt-4 m-1 border-radius-standard`} onClick={() => {
                                const imageSrc = this.webcamRef.current.getScreenshot();
                                if (imageSrc) this.setState({imageSrc});
                                else this.setPictureMessage('No image to capture yet.', 'info');
                            }}>Capture</Button>
                        </>}
                    </div>
                </>
            default:
                break;
        }
        return null;
    }

    showEditModal = (type, layout) => {
        this.setState({showEditModal: true, editType: type, editLayout: layout || type});
    }

    hideEditModal = (callback) => {
        this.setState({showEditModal: false, imageSrc: ''}, callback || (() => {
           if (!Utility.isEmpty(this.props.profileInfoUpdate.data?.errors)) this.props.profileInfoUpdate.data.errors = {};
           if (this.props.verifyAuth.data?.message) this.props.verifyAuth.data.message = null;
        }));
    }

    rateUser = (rating) => {
        const {dispatch, setHeaderMessage} = this.props;
        if (this.state.user.isMe()) {
            setHeaderMessage("You can't rate yourself", "warning");
            return;
        }
        dispatch(ProfileAction.rateUser(rating, this.state.user.getUuid()));
    }

    selectImage = (e) => {
        this.hideEditModal(() => {
            let tm = setTimeout(() => {
                document.getElementById("image-picker").click();
                clearTimeout(tm);
            }, 500);
        });
    };

    uploadFile = (file) => {
        const {dispatch} = this.props;
        const upload = (base64) => {
            dispatch(ProfileAction.updatePhoto(base64));
        };
        if (Utility.isString(file)) upload(file); else this.toBase64(file, upload);
    };
s
    toBase64(file, callback){

        imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }).then(file => {
            let reader = new FileReader();
            reader.onload = (e) => callback(btoa(e.target.result));
            reader.readAsBinaryString(file);
        });
    }

    render() {

        const {location, profilePictureUpdate, profileRemoveUpdate} = this.props;

        let {mounted, user, editType, editLayout, from} = this.state;

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
                                        {(profilePictureUpdate.requesting || profileRemoveUpdate.requesting) && <Spinner animation="border" variant="warning" size={`sm`}
                                                  className={`position-absolute`}
                                                  style={{top: 'calc(50% - 5px)', left: 'calc(50% - 5px)'}}/>}

                                        <img onClick={() => this.setState({showProfilePic: true})}
                                            src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                                            style={{objectFit: 'cover'}} alt={`user`}
                                            className={`w-100 h-100 rounded-circle border-accent background-accent-light p-2 cursor-pointer`}/>

                                        {user.isMe() && <div className={`rounded-circle background-accent position-absolute cursor-pointer`}
                                              style={{width: 25, height: 25, top: 60, left: 70}}
                                        onClick={() => this.showEditModal('picture')}>
                                            <img src={camera} alt={`nav-icon`} className={`img-fluid item-center`}/>
                                        </div>}
                                    </div>
                                    {user.isMe() && <input id={`image-picker`} type="file" hidden accept="image/png, image/jpeg"
                                            onChange={(event) => this.uploadFile(event.target.files[0])}/>}
                                </Col>
                                <Col xl={10} lg={10} md={9} sm={9} xs={8}>
                                    <h5 className={`mt-1`}>{user.getFirstname()} {user.getLastname()}</h5>
                                    <p className={`small m-0 mb-1`}>{user.getEmail()}</p>
                                    <Link to={{pathname: `/user/reviews`, state: {user: user, from: location}}} className={`color-accent`}>View reviews <img src={arrow} className={`ml-1 mb-1`} alt={`icon`}/> </Link>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        isHalf={true}
                                        edit={!user.isMe()}
                                        value={user.getRating()}
                                        onChange={this.rateUser}
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
                                    <Settings isMe={isMe} showEditModal={this.showEditModal}/>
                                </Tab.Pane>}
                            </Tab.Content>
                        </Card.Body>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>
            <Modal
                show={this.state.showEditModal}
                onHide={() => this.hideEditModal()}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static">
                <Modal.Header closeButton={true}>
                    <Modal.Title id="contained-modal-title-vcenter">{this.getEditTitle(editLayout)}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`p-4`}>
                    {this.getEditLayout(editType, editLayout, user)}
                </Modal.Body>
            </Modal>
            <Modal
                show={this.state.showProfilePic}
                onHide={() => this.setState({showProfilePic: false})}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <img src={close} alt={`close`} title={`close`} width={30} className={`position-absolute bg-white p-1 rounded-circle cursor-pointer`}
                     onClick={() => this.setState({showProfilePic: false})} style={{top: 15, right: 15, zIndex: 100}}/>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                            alt={`user`} className={`mx-auto`} style={{maxWidth: '100%'}}/>
                    </TransformComponent>
                </TransformWrapper>
            </Modal>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        verifyAuth: state.verifyAuth,
        verifyRequest: state.verifyRequest,
        importStates: state.importStates,
        importCountries: state.importCountries,
        profileRateUpdate: state.profileRateUpdate,
        profileInfoUpdate: state.profileInfoUpdate,
        profilePictureUpdate: state.profilePictureUpdate,
        profileRemoveUpdate: state.profileRemoveUpdate,
    }
}

export default connect(mapStateToProps)(Profile)