import React from 'react';
import { Redirect } from 'react-router-dom';
import LayoutRoute from "./components/layout/router";

export const PrivateRoute = ({ ...rest }) => (
    sessionStorage.getItem('token')
        ? <LayoutRoute {...rest} />
        : <Redirect to={{ pathname: '/login', state: { from: rest.location }, errorMessage: 'You must be logged in to access that route.' }} />
)

export const PrivateLogin = ({ ...rest }) => (
    sessionStorage.getItem('token')
        ? <Redirect to={{pathname: '/', state: {from: rest.location}}}/>
        : <LayoutRoute {...rest} />
)