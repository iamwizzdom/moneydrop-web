import React from 'react';
import { Redirect } from 'react-router-dom';
import LayoutRoute from "./components/layout/router";

export const PrivateRoute = ({ ...rest }) => {
    if (sessionStorage.getItem('token')) return <LayoutRoute {...rest} />;

    let path = { pathname: '/login', state: { from: rest.location }};

    if (rest.location.pathname !== '/') path.errorMessage = 'You must be logged in to access that route.';

    return <Redirect to={path} />;
}

export const PrivateLogin = ({ forceView, ...rest }) => (
    !forceView && sessionStorage.getItem('token')
        ? <Redirect to={{pathname: '/', state: {from: rest.location}}}/>
        : <LayoutRoute {...rest} />
)