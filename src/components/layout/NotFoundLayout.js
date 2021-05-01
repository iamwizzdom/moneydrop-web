import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";

class NotFoundLayout extends Component {

    render() {
        return <Container>
            <Row className="d-flex flex-column min-vh-100 justify-content-center align-items-center position-relative">
                <Col lg={8}>
                    { this.props.children }
                </Col>
            </Row>
        </Container>;
    }
}

export default withRouter(NotFoundLayout);
