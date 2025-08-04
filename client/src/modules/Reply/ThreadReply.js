import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import QuillWrapper from '../../screens/Thread Creation/QuillWrapper.js';

const CustomPlaceholder = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '1.2em',
                fontStyle: 'italic',
                textAlign: 'center',
                width: '100%',
                pointerEvents: 'none',
                zIndex: 10,
                color: theme.palette.text.disabled,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                borderRadius: theme.shape.borderRadius * 2,
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: -1,
            }} />
            <Typography variant="body1" sx={{ color: theme.palette.text.disabled, fontStyle: 'italic' }}>
                Please log in to reply to this thread.
            </Typography>
        </Box>
    );
};

export default function ThreadReply() {
    const { threadId } = useParams();
    const [questionDesc, setQuestionDesc] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const quillRef = useRef(null);
    const maxReplyLength = 10000;
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    const [isLoggedIn, setIsLoggedIn] = useState(!!foundUser);
    const theme = useTheme();

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
                const currentText = editor.getText();
                if (currentText.length > maxReplyLength) {
                    editor.deleteText(maxReplyLength, currentText.length - maxReplyLength);
                }
                editor.setSelection(maxReplyLength);
            }
        }
    };

    const ReplyButton = async () => {
        setIsSubmitting(true);

        if (!threadId) {
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

    const isContentEmpty = getPlainText(questionDesc).trim().length === 0;
    const isReplyTooShort = getPlainText(questionDesc).length < 10;
    const isDisabled = isSubmitting || isReplyTooShort || !isLoggedIn;

    return (
        <motion.div
            sx={{
                mb: 4,
                p: { xs: 2, md: 3 },
                borderRadius: theme.shape.borderRadius * 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                    Reply to Thread
                </Typography>
            </motion.header>

            <Box sx={{ position: 'relative', mb: 2, minHeight: '150px' }}>
                <QuillWrapper>
                    <ReactQuill
                        id="questionDesc"
                        ref={quillRef}
                        value={questionDesc}
                        modules={modules}
                        formats={formats}
                        onChange={handleQuillChange}
                        readOnly={!isLoggedIn}
                        placeholder={isLoggedIn ? "Type your reply here..." : " "}
                        theme="snow"
                    />
                </QuillWrapper>

                {!isLoggedIn && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 11,
                        pointerEvents: 'none',
                        borderRadius: theme.shape.borderRadius * 2,
                    }}>
                        <CustomPlaceholder sx={{ borderRadius: 15}} />
                    </Box>
                )}
            </Box>

            <Box sx={{
                textAlign: 'right',
                mb: 2,
                color: theme.palette.text.secondary,
                fontSize: '0.85rem',
            }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {getPlainText(questionDesc).length}/{maxReplyLength} characters
                </Typography>
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={ReplyButton}
                    disabled={isDisabled}
                    sx={{
                        py: 1.25,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[2],
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: !isDisabled ? 'translateY(-1px)' : 'none',
                            boxShadow: !isDisabled ? theme.shadows[4] : theme.shadows[2],
                        },
                        '&.Mui-disabled': {
                            backgroundColor: theme.palette.action.disabledBackground,
                            color: theme.palette.action.disabled,
                            cursor: 'not-allowed',
                            transform: 'none',
                            boxShadow: 'none',
                        },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                    whileHover={
                        isLoggedIn && !isSubmitting && !isReplyTooShort
                            ? { scale: 1.01 }
                            : {}
                    }
                    whileTap={
                        isLoggedIn && !isSubmitting && !isReplyTooShort
                            ? { scale: 0.98 }
                            : {}
                    }
                >
                    {isSubmitting ? (
                        <>
                            <CircularProgress size={20} color="inherit" /> Submitting...
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={isDisabled ? faCircleXmark : faCircleCheck} />
                            {isDisabled && !isLoggedIn ? "Log in to Reply" : isDisabled ? "Reply Too Short" : "Submit Reply"}
                        </>
                    )}
                </Button>
            </motion.div>
        </motion.div>
    );
}
