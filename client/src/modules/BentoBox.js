import React from "react";
import "../CSS/Main.css";

import MyAnimatedLineChart from "./I-Candy/Chart.js";
import CredScore from "./I-Candy/CredScore.js";

export default function BentoBox() {
  return (
    <div className="bento-box-area">
      <div className="limiter">
      <div className="top-grid">
          <div className="credit-scorepro-container">
            <h1>My Score Progress</h1>
            <div className="credit-scorepro-content">
              <MyAnimatedLineChart />
            </div>
          </div>
        
          <div className="trending-container">
            <h1 className="fire">Trending</h1>
            <div className="trending-content">
              <p>No trends</p>
              <p>No trends</p>
              <p>No trends</p>
              <p>No trends</p>
            </div>
          </div>
          </div>


          <div className="bottom-grid">
          <div className="cred-score-container">
            <h1>Credibility Score</h1>        
              <CredScore />
          </div>

          <div className="your-threads-container">
            <h1>Your Threads</h1>
            <div className="your-threads-content">
              <p>Start a new thread!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}