import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import notFound from "../assets/raw/lottie-lonely-404.json";
import logo from "../assets/images/logo-dark.svg";
import {Player} from "@lottiefiles/react-lottie-player";

class NotFound extends Component {

    player = null;

    componentDidMount() {
        this.player = React.createRef();
    }

    render() {
        return <div className={`text-center w-100`}>

            <div className={`w-100 justify-content-center d-flex mb-3`}>
                <img className={`img-fluid`} src={logo} alt={`logo`}/>
            </div>

            <Player
                ref={this.player} // set the ref to your class instance
                autoplay={true}
                loop={true}
                src={notFound}
                style={{ height: 'auto', width: '80%' }}
            />
            <Link to="/" className={`btn btn-outline-secondary btn-lg`}>Take Me Home</Link>
        </div>;
    }
}

export default NotFound;