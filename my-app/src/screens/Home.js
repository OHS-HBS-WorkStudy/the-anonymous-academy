// import useNavigation from '../modules/useNavigation.js';
import BentoBox from '../modules/BentoBox.js';
import Threads from '../modules/Threads.js';

export default function Home() {


   const mockUp = [
        { threadId: 1, threadTitle: "Why is math hard",  threadDescr: "I don't know what to do with this please" },
        { threadId: 2, threadTitle: "English why", threadDescr: "I don't know what to do with this please" },
        { threadId: 3, threadTitle: "Why am I stupid theory", threadDescr: "I don't know what to do with this please" },
        { threadId: 4, threadTitle: "Why is math hard",  threadDescr: "I don't know what to do with this please" },
        { threadId: 5, threadTitle: "English why", threadDescr: "I don't know what to do with this please" },
        { threadId: 6, threadTitle: "Why am I stupid theory", threadDescr: "I don't know what to do with this please" },
        { threadId: 7, threadTitle: "Why is math hard",  threadDescr: "I don't know what to do with this please" },
        { threadId: 8, threadTitle: "English why", threadDescr: "I don't know what to do with this please" },
        { threadId: 9, threadTitle: "Why am I stupid theory", threadDescr: "I don't know what to do with this please" },
        { threadId: 10, threadTitle: "Why am I stupid theory", threadDescr: "I don't know what to do with this please" },
    ];


    return (
        <div className="offset">
            <div className="layout-wrapper">
                <div className="layout-content">
                    <div className="Home">

                        <div className="container1">
                            <BentoBox />

                            {/* <ThreadFilter index={index} totalPages={totalPages}/> */}


                            <div className="container2">
                                <div className="thread-list-container">
                                    {mockUp.map(thread => (
                                        <div key={thread.threadId}>
                                            <Threads thread={thread}/>
                                            {/* <div onClick={() => goToThread(thread.threadId)}>
                                                <h3>{thread.threadTitle}</h3>
                                            </div> */}
                                        </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
