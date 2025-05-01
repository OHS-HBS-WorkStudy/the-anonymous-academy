import React, {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function ThreadVote() {

    // const [increase, didIncrease] = useState(false);
    // const [decrease, didDecrease] = useState(false);

    const [selectedVote, setSelectedVote] = useState(null); 

    return(
        <div className="vote-box">
            <button id="increase" className={`down-vote ${selectedVote ? "selected" : ""}`} >
               <FontAwesomeIcon icon={faArrowUp} className="fa-font" />
            </button>
            <p className="vote-number"><b>0</b></p>
            <button id="decrease" className={`down-vote ${selectedVote ? "selected" : ""}`} >
            <FontAwesomeIcon icon={faArrowDown} className="fa-font" />
            </button>
        </div>
    );
}