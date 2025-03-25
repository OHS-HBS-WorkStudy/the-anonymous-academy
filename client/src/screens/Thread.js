import React from 'react';
import { useParams } from 'react-router-dom';

export default function Thread() {
    const { threadId } = useParams(); 

    let data = JSON.parse(sessionStorage.getItem("data")) || {};
    const thread = data.find(t => t.thread_id === parseInt(threadId));

    if (!thread) {
        return <h2>Thread not found!</h2>;
    }


    return(
        <div className="offset">
            <h1>{thread.thread_name} {threadId}</h1>
            <p>{thread.thread_contents}</p>
        </div>
    );
}