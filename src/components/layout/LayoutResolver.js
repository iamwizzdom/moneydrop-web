import React, {Component} from 'react';
import {Route} from 'react-router-dom';

class LayoutResolver extends Component {

    forceUpdateHandler = () => {
        this.forceUpdate();
    };

    setHeaderMessage = (message, status) => {
        this.props.location.header = {message, status};
        this.forceUpdate();
    }

    render() {

        const {component: Comp, layout: Layout, ...rest} = this.props;

        if (!Layout) {
            return (
                <Route {...rest} render={props => (
                    <Comp forceUpdateHandler={this.forceUpdateHandler} setHeaderMessage={this.setHeaderMessage} {...props} />
                )}/>);
        }

        return (
            <Route {...rest} render={(props => {

                return <Layout component={<Comp forceUpdateHandler={this.forceUpdateHandler} setHeaderMessage={this.setHeaderMessage} {...props} />} forceUpdateHandler={this.forceUpdateHandler} {...props} />
            })}/>);

    }
}

export default LayoutResolver;
