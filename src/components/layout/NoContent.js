import empty from "../../assets/images/no-content.svg";
import React from "react";

const NoContent = () => {
    return <div className={`w-100 mt-5 text-center`}>
        <img src={empty} className={`img-fluid mx-auto d-block`} alt={`no-content`}/>
        <p className={`mt-2`}>No Content</p>
    </div>
}

export default NoContent;