import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import Footer from "../footer/Footer";

class AppLayout extends Component {

    render() {
        return <Container>
            <Row className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: 'calc(100vh - 50px)'}}>
                <Col lg={this.props.location.pathname === '/signup' ? 10 : 6} className={`mb-5`}>
                    { this.props.component }
                </Col>
            </Row>
            <Footer/>
        </Container>;
    }
}

export default withRouter(AppLayout);
