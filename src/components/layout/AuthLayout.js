import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";

class AppLayout extends Component {

    render() {
        return <Container>
            <Row className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <Col lg={this.props.path === '/signup' ? 10 : 6}>
                    { this.props.children }
                </Col>
            </Row>
        </Container>;
    }
}

export default withRouter(AppLayout);
