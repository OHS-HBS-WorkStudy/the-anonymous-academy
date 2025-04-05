import React, { useState, useEffect, useRef } from 'react';
import CountUpComponent from '../modules/CountUp.js';

// Other modules components imports
import BentoBox from '../modules/BentoBox.js';
import Threads from '../modules/Threads.js';
import ThreadFilter from '../modules/ThreadFilter.js';


export default function Home() {
    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    let recieveThread = data || [];



    console.log(data, recieveThread);

        return (
            <div className="offset">
                <div className="layout-wrapper">
                    <div className="layout-content">
                    <div className="Home">
                        <div className="container1">

                        <div className="questionsSection">
                            <h1>
                            <span className="questionsTitle">Questions</span>
                            <span className="countUp">
                                <CountUpComponent endValue={recieveThread.length} duration={3.8} />
                            </span>
                            </h1>
                        </div>

                        <BentoBox />
                        
                        <div className="main-content-area">
                        <ThreadFilter />
                        <div className='grid-container-area'>
                            <div className="thread-list-container">
                            {recieveThread && recieveThread.length > 0 ? (
                                recieveThread.map((thread) => (
                                <div key={thread.thread_id}>
                                    <Threads thread={thread} />
                                </div>
                                ))
                            ) : (
                                <div className="no-threads-message">No Threads</div>
                            )}
                            </div>
                            </div>
                            <div className='right-space-area'>
                                <div className='trending-threads-cont'>

                                <h3>Trending Threads</h3>
                                    <ul className='trending-threads-list'>
                                        <li className='trending-thread-item'>
                                        Exploring the Future of AI in Creative Fields
                                        </li>
                                        <li className='trending-thread-item'>
                                        Best Practices for Writing Clean and Maintainable Code
                                        </li>
                                        <li className='trending-thread-item'>
                                        The Impact of Remote Work on Team Collaboration
                                        </li>
                                        <li className='trending-thread-item'>
                                        Share Your Favorite Productivity Hacks and Tools
                                        </li>
                                        <li className='trending-thread-item'>
                                        A Deep Dive into the Latest advancements in Web Security
                                        </li>
                                        {/* You can add more trending threads here */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
}
