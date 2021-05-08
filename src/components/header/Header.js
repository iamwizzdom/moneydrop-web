import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../../assets/images/logo.svg';
import notification from '../../assets/images/notification.svg';
import {AppConst} from "../../constants";
import User from "../../models/User";
import {AuthAction} from "../../actions";
import userIcon from "../../assets/images/user.svg";
import logouts from "../../assets/images/logouts.svg";
import {LinkContainer} from "react-router-bootstrap";

const HeaderLayout = (props) => {

    const {dispatch} = props;

    const logout = () => {
        dispatch(AuthAction.logout())
    };

    const user = new User(localStorage.getItem("user"));

    const showMenu = () => {
        document.getElementById("mobile-bottom-sheet-container").classList.add("top");
        document.getElementById("mobile-bottom-sheet").classList.add("top");
    }

    return <>
        <Navbar bg="light" expand="lg" sticky={"top"}>
            <Container className={`pt-1 pb-1`}>
                <Navbar.Brand href="/">
                    <img src={logo} style={{marginTop: '-5px'}} alt={`${AppConst.APP_NAME} logo`} width={40} height={40} />
                    <span className="color-accent font-size-22 m-1 pc-brand">oney<b>Drop</b></span>
                </Navbar.Brand>
                <Nav className="ml-auto mobile-header-menu" activeKey={props.location.pathname}>
                    <LinkContainer exact to="/notifications">
                        <Nav.Link eventKey={`/notifications`} className={`float-left m-2 notification-icon size-40`}>
                            <img src={notification} width={15} alt={`notification`} className={`img-fluid m-auto d-block`}/>
                        </Nav.Link>
                    </LinkContainer>
                    <Nav.Item className={`ml-auto float-right`} onClick={showMenu}>
                        <img src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                             onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                             style={{width: 40, height: 40, objectFit: 'cover'}} alt={`user`}
                             className={`img-thumbnail rounded-circle border-accent background-accent-light my-p-0-8 m-2`}/>
                    </Nav.Item>
                </Nav>
                <Nav className="ml-auto pc-header-menu" activeKey={props.location.pathname}>
                    <LinkContainer exact to="/notifications">
                        <Nav.Link eventKey={`/notifications`} className={`m-2 mr-3 notification-icon size-40`}>
                            <img src={notification} width={16} alt={`notification`} className={`img-fluid m-auto d-block`}/>
                        </Nav.Link>
                    </LinkContainer>
                    <Nav.Item className={`pt-2`}>
                        <img src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                             onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                             style={{width: 40, height: 40, objectFit: 'cover'}} alt={`user`}
                             className={`img-thumbnail rounded-circle border-accent background-accent-light my-p-0-8`}/>
                    </Nav.Item>
                    <NavDropdown title={`${user.getFirstname()} ${user.getLastname()}`} className={`pt-2 font-weight-bold`} id="basic-nav-dropdown" aria-dropeffect={`copy`}>
                        <LinkContainer exact to={{pathname: `/user/profile`, state: {user: null}}}>
                            <NavDropdown.Item eventKey="/user/profile">
                                <img src={userIcon} width={18} className={`mr-3`} style={{marginTop: '-5px', padding: 1.5}} alt={`nav-icon`}/>
                                User Account
                            </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            <img src={logouts} width={18} className={`mr-3`} style={{marginTop: '-5px'}} alt={`nav-icon`}/>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    </>;
};

export default HeaderLayout;