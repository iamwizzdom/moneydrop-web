import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Header from "../header/Header";
import Message from "./Message";
import {Col, Container, Row} from "react-bootstrap";
import NavLayout from "./NavLayout";
import MobileNavLayout from "./MobileNavLayout";
import Footer from "../footer/Footer";

class AppLayout extends Component {

    render() {

        const { component, hasHeader = true, location} = this.props;

        const hideMenu = () => {
            document.getElementById("mobile-bottom-sheet-container").classList.remove("top");
            document.getElementById("mobile-bottom-sheet").classList.remove("top");
        }

        return (
            <div>
                {hasHeader && <Header {...this.props}/>}
                {location.header && <Message header={location.header} {...this.props}/>}
                <Container className={`mt-5 pb-5 position-relative container-min-height`}>
                    <Row>
                        <Col md={3} className={`pc-side-nav`}>
                            <NavLayout {...this.props}/>
                        </Col>
                        <Col md={9} className={`pc-container`}>
                            {component}
                        </Col>
                    </Row>
                </Container>
                <Footer/>
                <div className={`mobile-bottom-sheet-container`} id={`mobile-bottom-sheet-container`} onClick={hideMenu}/>
                <div className="mobile-bottom-sheet" id={`mobile-bottom-sheet`}>
                    <div className={`sheet-line justify-content-center d-flex`}><div/></div>
                    <div className={`sheet-holder scroll-vertical scrollbar-invisible`}>
                        <MobileNavLayout {...this.props} hideMenu={hideMenu}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AppLayout);
