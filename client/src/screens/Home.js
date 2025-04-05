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
                                <div className='right-space'>

                                <p>new content</p>
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
