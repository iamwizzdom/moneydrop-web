import React, {Component} from 'react';
import {Route} from 'react-router-dom';

class LayoutRoute extends Component {

    forceUpdateHandler = () => {
        this.forceUpdate();
    };

    setHeaderMessage = (message, status) => {
        this.props.location.header = {message, status};
        this.forceUpdate();
    }

    render() {

        const {component: Component, layout: Layout, ...rest} = this.props;

        if (!Layout) {

            return (
                <Route {...rest} render={props => (
                    <Component forceUpdateHandler={this.forceUpdateHandler} setHeaderMessage={this.setHeaderMessage} {...props} />
                )}/>);
        }

        return (
            <Route {...rest} render={(props => {

                return <Layout component={<Component forceUpdateHandler={this.forceUpdateHandler} setHeaderMessage={this.setHeaderMessage} {...props} />} forceUpdateHandler={this.forceUpdateHandler} {...props} />
            })}/>);

    }
}

export default LayoutRoute;