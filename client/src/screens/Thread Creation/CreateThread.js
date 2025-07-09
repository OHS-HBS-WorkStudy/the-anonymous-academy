import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Chat as CommentDotsIcon,
  Poll as PollIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

import AddTags from "./AddTags";
import CreateThreadAside from "../sub-screens/CreateThreadAside";
import CreatePoll from "./CreatePoll";

import QuillWrapper from './QuillWrapper';

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "start",
  paddingTop: '45px',
  paddingBottom: '45px',
  justifyContent: "center",
  background: theme.palette.background.default,
  boxSizing: "border-box",
}));

const MainContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 2.5,
  boxShadow: `0 12px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.04)`,
  backdropFilter: 'blur(6px)',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  width: '100%',
  maxWidth: '960px',
  transition: 'box-shadow 0.3s ease, transform 0.2s ease',

  '&:hover': {
    boxShadow: `0 16px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)`,
    transform: 'translateY(-2px)',
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CharCounter = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(2),
  textAlign: "right",
  color: theme.palette.text.secondary,
  fontSize: "0.8rem",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 3,
  fontSize: "1.1rem",
  fontWeight: "bold",
}));

export default function CreateThread() {
  const theme = useTheme();
  const [ThreadTitle, setThreadTitle] = useState("");
  const [ThreadContents, setThreadContents] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [ruleAgreement, setRuleAgreement] = useState(true);
  const [includePoll, setIncludePoll] = useState(false);
  const [markUrgent, setMarkUrgent] = useState(false);
  const quillRef = useRef(null);
  const maxTitleLength = 120;
  const maxDescLength = 10000;

  const handleIncludePollChange = (e) => setIncludePoll(e.target.checked);
  const handleMarkUrgentChange = (e) => setMarkUrgent(e.target.checked);
  const handlePollData = (question, options) => {
    setPollQuestion(question);
    setPollOptions(options);
  };

  useEffect(() => {
    setThreadTitle(sessionStorage.getItem("threadTitle") || "");
    setThreadContents(sessionStorage.getItem("threadContents") || "");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("threadTitle", ThreadTitle);
    sessionStorage.setItem("threadContents", ThreadContents);
  }, [ThreadTitle, ThreadContents]);

  const getPlainText = (html) => new DOMParser().parseFromString(html, "text/html").body.textContent || "";

  const handleQuillChange = (value) => {
    const plainText = getPlainText(value);
    if (plainText.length <= maxDescLength) {
      setThreadContents(value);
    } else {
      const editor = quillRef.current?.getEditor();
      if (editor) {
        editor.setContents(editor.getContents().slice(0, maxDescLength));
        editor.setSelection(maxDescLength);
      }
    }
  };

  const handleChange = (value, setValue, maxLength) => {
    setValue(value.length <= maxLength ? value : value.substring(0, maxLength));
  };

  const canSubmit = () => {
    if (!ruleAgreement) return "Please agree to the guidelines.";
    if (!getPlainText(ThreadTitle).trim()) return "Please enter a title for your thread.";
    if (!getPlainText(ThreadContents).trim()) return "Please enter content for your thread.";
    return null;
  };

  const submitThread = (e) => {
    e.preventDefault();
    const submissionError = canSubmit();
    if (submissionError) {
      alert(submissionError);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const sanitizedTitle = DOMPurify.sanitize(ThreadTitle);
      const sanitizedContents = DOMPurify.sanitize(ThreadContents);
      const threads = JSON.parse(sessionStorage.getItem("data")) || [];

      const newThread = {
        thread_name: sanitizedTitle,
        thread_contents: sanitizedContents,
        thread_id: threads.length,
        tags,
        created_at: new Date().toISOString(),
        user: JSON.parse(sessionStorage.getItem("foundUser")),
        poll: includePoll && pollQuestion && pollOptions.some((opt) => opt.trim() !== "")
          ? {
              question: DOMPurify.sanitize(pollQuestion),
              options: pollOptions.map((opt) => DOMPurify.sanitize(opt)),
            }
          : null,
        urgent: markUrgent,
      };

      sessionStorage.setItem("data", JSON.stringify([...threads, newThread]));
      sessionStorage.setItem("tags", JSON.stringify(tags));
      sessionStorage.setItem("recentlyViewed", JSON.stringify([{ id: newThread.thread_id, title: sanitizedTitle }, ...threads.slice(0, 9)]));
      setTags([]);
      setThreadTitle("");
      setThreadContents("");
      setIncludePoll(false);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setMarkUrgent(false);
      setIsLoading(false);
    }, 1500);
  };

  const isDisabled = isLoading || canSubmit() !== null;

  return (
    <PageContainer>
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: "1200px" }}>
        <Grid item xs={12} md={8}>
          <MainContentPaper>
            <Box sx={{ mb: 4, textAlign: "center" }}>
             <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  color: theme.palette.primary.main
                }}
              >
                Share What’s on Your Mind
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Ask a question. Share an idea. Spark a discussion.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="label" htmlFor="questionTitle" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LightbulbIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Question Title
              </Typography>
              <TextField
                id="questionTitle"
                variant="outlined"
                fullWidth
                placeholder="e.g., 'What are your thoughts on privacy in the digital age?'"
                value={ThreadTitle}
                onChange={(e) => handleChange(e.target.value, setThreadTitle, maxTitleLength)}
                inputProps={{ maxLength: maxTitleLength }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.input,
                    boxShadow: theme.shadows[1],
                    transition: "all 0.3s ease-in-out",
                    "& fieldset": {
                      borderColor: theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.secondary.light,
                      borderWidth: "2px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: "2px",
                    },
                  },
                }}
              />
              <CharCounter>{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</CharCounter>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="label" htmlFor="questionDesc" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CommentDotsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Elaborate Here
              </Typography>
              <QuillWrapper>
                <ReactQuill
                  id="questionDesc"
                  ref={quillRef}
                  value={ThreadContents}
                  onChange={handleQuillChange}
                  required
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
                      [{ indent: "-1" }, { indent: "+1" }, { background: [] }],
                      ["clean"],
                    ],
                  }}
                />
              </QuillWrapper>
              <CharCounter>{getPlainText(ThreadContents).length}/{maxDescLength} characters</CharCounter>
            </Box>

            <Box sx={{ mb: 3 }}>
              <AddTags tags={tags} setTags={setTags} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom color="text.primary">Additional Options</Typography>
              <FormControlLabel
                control={<Checkbox checked={includePoll} onChange={handleIncludePollChange} color="primary" />}
                label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PollIcon /> Include a Poll?</Box>}
              />
              <FormControlLabel
                control={<Checkbox checked={markUrgent} onChange={handleMarkUrgentChange} color="warning" />}
                label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><WarningIcon /> Mark as Urgent?</Box>}
              />
            </Box>

            {includePoll && (
              <Box sx={{ mb: 3 }}>
                <CreatePoll onPollData={handlePollData} />
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <SubmitButton
                variant="contained"
                color="primary"
                onClick={submitThread}
                disabled={isDisabled}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : isDisabled ? <CancelIcon /> : <CheckCircleIcon />}
              >
                {isLoading ? "Submitting..." : isDisabled ? canSubmit() : "Submit Thread"}
              </SubmitButton>
            </Box>
          </MainContentPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CreateThreadAside ruleAgreement={ruleAgreement} setRuleAgreement={setRuleAgreement} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
