import React from "react";
import "../CSS/Main.css";

export default function BentoBox() {
  return (
    <div className="bento-box-area">
      <div className="limiter">
        <div className="bento-box-grid">
          <div className="thread-history-container">
            <h1>Thread History</h1>
            <div className="thread-history-content">
              <p>No threads visited yet</p>
            </div>
          </div>

          <div className="trending-container">
            <h1 className="fire">Trending</h1>
            <div className="trending-content">
              <p>No trends</p>
            </div>
          </div>

          <div className="cred-score-container">
            <h1>Credibility Score</h1>
            <div className="cred-content">
              {/* <CredScore /> */}
            </div>
          </div>

          <div className="your-threads-container">
            <h1>Your Threads</h1>
            <div className="your-threads-content">
              <p>No threads created yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}