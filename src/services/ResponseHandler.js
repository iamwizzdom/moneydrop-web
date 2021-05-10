import swal from "@sweetalert/with-react";
import React from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import locked from "../assets/raw/locked.json";

class ResponseHandler {
    static handleResponse(response) {
        if (response.status === 419) {
            sessionStorage.clear();
            localStorage.clear();
            swal(<div>
                <Player
                    autoplay={true}
                    loop={true}
                    src={locked}
                    style={{ height: '150px', width: '150px', marginTop: 50 }}
                />
                <h3 className={`mt-2 mb-4 color-accent`}>Session expired</h3>
            </div>).then(() => window.location.assign('/login'));
            return;
        }
        if (!response.ok) {
            return Promise.reject(response.json());
        }
        return response.json();
    }
}

export default ResponseHandler;