import React from 'react';
import {Route} from 'react-router-dom';

const LayoutRoute = ({component: Component, layout: Layout, ...rest}) => {

    if (!Layout) {

        return (
            <Route {...rest} render={props => (
                <Component {...props} />
            )}/>);
    }

    return (
        <Route {...rest} render={(props => {

            return <Layout {...props} {...rest} >
                <Component {...props} {...rest}/>
            </Layout>
        })}/>);
}

export default LayoutRoute;