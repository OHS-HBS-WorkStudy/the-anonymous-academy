import { useState, useRef } from "react";
import { useParams } from "react-router-dom"; 
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default function ThreadReply() {
    const { threadId } = useParams(); 
    const [questionDesc, setQuestionDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const quillRef = useRef(null);
    const maxReplyLength = 10000;

    const getPlainText = (html) =>
        new DOMParser().parseFromString(html, "text/html").body.textContent || "";

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

    if (!foundUser) return null;
    const isDisabled = isSubmitting || getPlainText(questionDesc).length < 10;


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
                <ReactQuill
                    id="questionDesc"
                    ref={quillRef}
                    value={questionDesc}
                    style={{ borderRadius: '8px', minHeight: '100px' }}
                    modules={modules}
                    onChange={handleQuillChange}
                />

                <motion.div
                    className="charCounter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {getPlainText(questionDesc).length}/{maxReplyLength} characters
                </motion.div>

                <motion.button
                    className="reply-send"
                    onClick={ReplyButton}
                    disabled={isDisabled}
                    whileHover={
                        !isSubmitting && getPlainText(questionDesc).length >= 10
                            ? { scale: 1.01 }
                            : {}
                    }
                    whileTap={
                        !isSubmitting && getPlainText(questionDesc).length >= 10
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
