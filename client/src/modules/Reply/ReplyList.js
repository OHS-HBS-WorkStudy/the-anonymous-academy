import { useParams } from "react-router-dom"; 
import ReactQuill from "react-quill";
import TimeCounter from "../TimeCounter";

import DOMPurify from 'dompurify';

export default function ReplyList() {
    const { threadId } = useParams(); 
    const allReplies = JSON.parse(sessionStorage.getItem("replies")) || {};

    const findReplies = () => {
        return allReplies[threadId] || [];
    };

    const replies = findReplies();

    return (
        <div style={{ color: "white" }}>
            {replies.length > 0 ? (
                replies.map((reply, index) => (
                    <div key={index} className="reply">
                        <p><strong>Posted:</strong> Anonymous {reply.user || "Unknown User"}</p>
                        <p><strong>Created:</strong> {<TimeCounter date={reply.date}/>}</p>
                        <ReactQuill 
                            value={DOMPurify.sanitize(reply.contents)} 
                            readOnly={true} 
                            theme="bubble" 
                        />
                    </div>
                ))
            ) : (
                <p>No replies found for this thread.</p>
            )}
        </div>
    );
}
