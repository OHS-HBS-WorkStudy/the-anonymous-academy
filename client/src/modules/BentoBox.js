// import CredScore from "./CredScore.js";
import '../CSS/Main.css';

export default function BentoBox() {
    return(
        <>
            <div className="bento-box">
                    <div className="col-left">
                        <div className="col-row row1">
                            <div className="threadvisted">
                                <h1>Thread History</h1>

                                <div className="threadvisted-content">
                                    <p>No threads visited yet</p>
                                </div> 
                            </div>
                        </div>

                        <div className="col-row row2">
                            <div className="threadcreated">
                                <h1>Your Threads</h1>

                                <div className="threadcreated-content">
                                    <p>No threads created yet</p>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="col-right">
                        <div className="col-row top">
                            <div className="threadtrending">
                                <h1 className="fire">Trending</h1>

                                <div className="threadtrending-content">
                                    <p>No trends</p>
                                </div>  
                            </div>
                        </div>

                        <div className="col-row bottom">
                            <div className="col-row bottom row1">
                                <div className="credibility">
                                    <h1>Credibility Score</h1>

                                    <div className="cred-content">
                                        {/* <CredScore /> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}