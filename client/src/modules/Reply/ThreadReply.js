import { useState, useRef } from "react";
import { useParams } from "react-router-dom"; 
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function ThreadReply() {
    const { threadId } = useParams(); 
    const [questionDesc, setQuestionDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const quillRef = useRef(null);

    const maxReplyLength = 10000;

    const getPlainText = (html) => new DOMParser().parseFromString(html, "text/html").body.textContent || "";

    const handleQuillChange = (value) => {
        const plainText = getPlainText(value);
        if (plainText.length <= maxReplyLength) {
            setQuestionDesc(value);
        } else {
            const editor = quillRef.current.getEditor();
            editor.setContents(editor.getContents().slice(0, maxReplyLength));
            editor.setSelection(maxReplyLength);
        }
    };



  
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    const ReplyButton = async () => {
        setIsSubmitting(true); 

        if (!threadId) {
            console.error("Thread ID not found in the route parameters.");
            setIsSubmitting(false); 
            return;
        }

        const data = {
            contents: questionDesc,
            thread_id: threadId,
            user: foundUser.account_type,
            email: foundUser.email,
            date: new Date().toISOString(),
        };

        const allReplies = JSON.parse(sessionStorage.getItem("replies")) || {};
        if (!Array.isArray(allReplies[threadId])) {
            allReplies[threadId] = [];
        }
        allReplies[threadId].push(data);
        sessionStorage.setItem("replies", JSON.stringify(allReplies));

        console.log(`Reply saved to thread ${threadId}:`, data);

   
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false); 
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            [{ indent: "-1" }, { indent: "+1" }, { background: [] }],
            ["clean"],
        ],
    };
    if (foundUser) {
        return (
            <div className="reply-section">

                <header className="replies-header">
                    <h2 className="replies-title">Reply to Thread</h2>
                </header>
                <div className="reply-container">
                    <ReactQuill
                        id="questionDesc"
                        ref={quillRef}
                        value={questionDesc}
                        style={{ borderRadius: '8px', minHeight: '100px' }}
                        modules={modules}
                        onChange={handleQuillChange}
                    />
                    <div className="charCounter">
                        {getPlainText(questionDesc).length}/{maxReplyLength} characters
                    </div>
                    <button
                        className="btn-send"
                        onClick={ReplyButton}
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        )
    } else {
        return;
    }
}