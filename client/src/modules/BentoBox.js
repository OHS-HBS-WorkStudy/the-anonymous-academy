import React from "react";
import "../CSS/Main.css";
import MyAnimatedLineChart from "./I-Candy/Chart.js";
import CredScore from "./I-Candy/CredScore.js";
import { motion } from "framer-motion";

export default function BentoBox() {
  return (
    <div className="bento-box-area">
      <div className="limiter">
        <div className="top-grid">
          <motion.div
            className="credit-scorepro-container"
            style={{ width: "100%", height: "100%" }}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            transition={{ duration: 0.2 }}
          >
            <h1>My Score Progress</h1>
            <div className="credit-scorepro-content">
              <MyAnimatedLineChart />
            </div>
          </motion.div>

          <motion.div
            className="trending-container"
            style={{ width: "100%", height: "100%" }}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="fire">Trending</h1>
            <div className="trending-content">
              <p>No trends</p>
              <p>No trends</p>
              <p>No trends</p>
              <p>No trends</p>
            </div>
          </motion.div>
        </div>

        <div className="bottom-grid">
          <motion.div
            className="cred-score-container"
            style={{ width: "100%", height: "100%" }}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            transition={{ duration: 0.2 }}
          >
            <h1>Credibility Score</h1>
            <CredScore />
          </motion.div>

          <motion.div
            className="your-threads-container"
            style={{ width: "100%", height: "100%" }}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            transition={{ duration: 0.2 }}
          >
            <h1>Your Threads</h1>
            <div className="your-threads-content">
              <p>Start a new thread!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}