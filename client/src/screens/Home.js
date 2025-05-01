import React, { useState, useEffect, useRef } from 'react';

// Other modules components imports
import BentoBox from '../modules/BentoBox.js';
import Threads from '../modules/Thread/Threads.js';
import ThreadFilter from '../modules/Filtering/ThreadFilter.js';

export default function Home() {
    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    let recieveThread = data || [];

    console.log(data, recieveThread);

    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    return (
        <div className="offset">
            <div className="Home">
                <div className="container1">
                     <div className="welcomeSection">
                        <h1>
                            <span className="questionsTitle">Welcome! <span className="color-accent">{foundUser?.first_name} {foundUser?.last_name}</span></span>
                        </h1>
                    </div>

                    <BentoBox />

                    <div className="main-content-area">
                        <div className="grid-container-area">
                        Interesting posts for you
                        Based on your viewing history and watched tags.
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
                       
                    </div>
                </div>
            </div>
        </div>
    );
}
