import React from 'react';
import { useParams } from 'react-router-dom';

export default function Thread() {
    const { threadId } = useParams(); 

    const mockUp = [
        { threadId: 1, threadTitle: "Why is math hard" },
        { threadId: 2, threadTitle: "English why" },
        { threadId: 3, threadTitle: "Why am I stupid theory" }
    ];

    const thread = mockUp.find(t => t.threadId === parseInt(threadId));

    if (!thread) {
        return <h2>Thread not found!</h2>;
    }


    return(
        <div className="offset">
            <h1>{thread.threadTitle} {threadId}</h1>
            <p>This is the Thread page.</p>
        </div>
    );
}