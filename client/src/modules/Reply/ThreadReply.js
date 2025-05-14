import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const CustomPlaceholder = () => (
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.2em',
        fontStyle: 'italic',
        textAlign: 'center',
        width: '100%',
        pointerEvents: 'none',
        zIndex: 10
    }}>
        <div className="white "style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: -1
        }} />
        <p>Please log in to reply to this thread.</p>
    </div>
);


export default function ThreadReply() {
    const { threadId } = useParams();
    const [questionDesc, setQuestionDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const quillRef = useRef(null);
    const maxReplyLength = 10000;
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    const [isLoggedIn, setIsLoggedIn] = useState(!!foundUser);

    useEffect(() => {
        setIsLoggedIn(!!JSON.parse(sessionStorage.getItem("foundUser")));
    }, []);

    const getPlainText = (html) =>
        new DOMParser().parseFromString(html, "text/html").body.textContent || "";

    const handleQuillChange = (value) => {
        if (isLoggedIn) {
            const plainText = getPlainText(value);
            if (plainText.length <= maxReplyLength) {
                setQuestionDesc(value);
            } else {
                const editor = quillRef.current.getEditor();
                editor.setContents(editor.getContents().slice(0, maxReplyLength));
                editor.setSelection(maxReplyLength);
            }
        }
    };

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
        setQuestionDesc('');
    };

    const modules = {
        toolbar: isLoggedIn ? [
            [{ header: "1" }, { header: "2" }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            [{ indent: "-1" }, { indent: "+1" }, { background: [] }],
            ["clean"],
        ] : false, 
    };

    const formats = [
        'header', 'size', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'align', 'indent', 'background'
    ];

    const isDisabled = isSubmitting || getPlainText(questionDesc).length < 10 || !isLoggedIn;

    return (
        <motion.div
            className="reply-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.header
                className="replies-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="replies-title">Reply to Thread</h2>
            </motion.header>

            <motion.div
                className="reply-container"
                layout
                transition={{ type: "spring", stiffness: 80 }}
            >
                <div style={{ position: 'relative' }}>
                    <ReactQuill
                        id="questionDesc"
                        ref={quillRef}
                        value={questionDesc}
                        style={{ borderRadius: '8px', minHeight: '100px' }}
                        modules={modules}
                        formats={formats}
                        onChange={handleQuillChange}
                        readOnly={!isLoggedIn}
                        placeholder={isLoggedIn ? "" : " "} 
                    />
                    {!isLoggedIn && <CustomPlaceholder />}
                </div>

                <motion.div
                    className="charCounter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {isLoggedIn ? `${getPlainText(questionDesc).length}/${maxReplyLength} characters` : `${getPlainText(questionDesc).length}/${maxReplyLength} characters`}
                </motion.div>

                <motion.button
                    className="reply-send"
                    onClick={ReplyButton}
                    disabled={isDisabled}
                    whileHover={
                        isLoggedIn && !isSubmitting && getPlainText(questionDesc).length >= 10
                            ? { scale: 1.01 }
                            : {}
                    }
                    whileTap={
                        isLoggedIn && !isSubmitting && getPlainText(questionDesc).length >= 10
                            ? { scale: 0.95 }
                            : {}
                    }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {isSubmitting ? (
                        <>
                            <FontAwesomeIcon icon={faCircleCheck} bounce className="inline-icon" /> Submitting...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={isDisabled ? faCircleXmark : faCircleCheck} className="inline-icon" /> Submit
                        </>
                    )}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}