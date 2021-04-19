import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../../assets/images/logo.svg';
import notification from '../../assets/images/notification.svg';
import {AppConst} from "../../constants";
import User from "../../models/User";
import {AuthAction} from "../../actions";
import userIcon from "../../assets/images/user.svg";
import logouts from "../../assets/images/logouts.svg";

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
                <Navbar.Brand href="#home">
                    <img src={logo} style={{marginTop: '-5px'}} alt={`${AppConst.APP_NAME} logo`} width={40} height={40} />
                    <span className="color-accent font-size-22 m-1 pc-brand">oney<b>Drop</b></span>
                </Navbar.Brand>
                <Nav className="ml-auto mobile-header-menu">
                    <Nav.Link href="#notification" className={`float-left mr-2`}>
                        <img src={notification} width={20} alt={`notification`} className={`img-fluid m-2`}/>
                    </Nav.Link>
                    <Nav.Item className={`pt-2 float-right`} onClick={showMenu}>
                        <img src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                             style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`user`}
                             className={`img-thumbnail rounded-circle border-accent background-accent my-p-0-8`}/>
                    </Nav.Item>
                </Nav>
                <Nav className="ml-auto pc-header-menu">
                    <Nav.Link href="#notification">
                        <img src={notification} width={20} alt={`notification`} className={`img-fluid m-2`}/>
                    </Nav.Link>
                    <Nav.Item className={`pt-2`}>
                        <img src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                             style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`user`}
                             className={`img-thumbnail rounded-circle border-accent background-accent my-p-0-8`}/>
                    </Nav.Item>
                    <NavDropdown title={`${user.getFirstname()} ${user.getLastname()}`} className={`pt-2 font-weight-bold`} id="basic-nav-dropdown" aria-dropeffect={`copy`}>
                        <NavDropdown.Item href="#action/3.1">
                            <img src={userIcon} width={18} className={`mr-3`} style={{marginTop: '-5px', padding: 1.5}} alt={`nav-icon`}/>
                            User Account
                        </NavDropdown.Item>
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