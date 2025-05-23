// Library declaration imports
import React, { useState, useRef, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faLightbulb, faCommentDots  , faPoll, faExclamationCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


// Other modules components imports
import useNavigation from "../useNavigation";
import AddTags from "./AddTags";
import CreateThreadAside from "../../screens/sub-screens/CreateThreadAside";
import CreatePoll from "./CreatePoll";
import { motion } from "framer-motion";

export default function CreateThread() {
  const [ThreadTitle, setThreadTitle] = useState("");
  const [ThreadContents, setThreadContents] = useState("");
  const [tags, setTags] = useState(JSON.parse(sessionStorage.getItem("tags")) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [pollQuestion, setPollQuestion] = useState(""); 
  const [pollOptions, setPollOptions] = useState(['', '']); 

  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
  };


  const [ruleAgreement, setRuleAgreement] = useState(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    return foundUser && foundUser.pref && foundUser.pref.ruleAgreement !== undefined
        ? foundUser.pref.ruleAgreement
        : false;
});

const [includePoll, setIncludePoll] = useState(false);

const handleIncludePollChange = (event) => {
  setIncludePoll(event.target.checked);
};

const handlePollData = (question, options) => {
  setPollQuestion(question);
  setPollOptions(options);
};



useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));
    
    if (foundUser && foundUser.pref) {
        foundUser.pref.ruleAgreement = ruleAgreement;
        sessionStorage.setItem("foundUser", JSON.stringify(foundUser));
    }
}, [ruleAgreement]);
  

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = sessionStorage.getItem("foundUser");
    return user ? JSON.parse(user) : null;
  });

  const { goToThread, goToSignUp, goToLogin } = useNavigation();
  const quillRef = useRef(null);

  const maxTitleLength = 200;
  const maxDescLength = 10000;

  useEffect(() => {
    setThreadTitle(sessionStorage.getItem("threadTitle") || "");
    setThreadContents(sessionStorage.getItem("threadContents") || "");
  }, []);

  useEffect(() => {
    sessionStorage.setItem("threadTitle", ThreadTitle);
    sessionStorage.setItem("threadContents", ThreadContents);
    sessionStorage.setItem("ruleAgreement", ruleAgreement);
  }, [ThreadTitle, ThreadContents, ruleAgreement]);

  const getPlainText = (html) => new DOMParser().parseFromString(html, "text/html").body.textContent || "";

  const handleQuillChange = (value) => {
    const plainText = getPlainText(value);
    if (plainText.length <= maxDescLength) {
      setThreadContents(value);
    } else {
      const editor = quillRef.current.getEditor();
      editor.setContents(editor.getContents().slice(0, maxDescLength));
      editor.setSelection(maxDescLength);
    }
  };

  const handleChange = (value, setValue, maxLength) => {
    setValue(value.length <= maxLength ? value : value.substring(0, maxLength));
  };

  const canSubmit = () => {
    if (!ruleAgreement) {
      return "Please agree to the guidelines.";
    }
    if (!getPlainText(ThreadTitle).trim()) {
      return "Please enter a title for your thread.";
    }
    if (!getPlainText(ThreadContents).trim()) {
      return "Please enter content for your thread.";
    }
    return null; 
  };

  const submitThread = (e) => {
    e.preventDefault();
    if (!ruleAgreement) return alert("Please agree to the guidelines before submitting.");
    setIsLoading(true);

    setTimeout(() => {
      const sanitizedTitle = DOMPurify.sanitize(ThreadTitle);
      const sanitizedContents = DOMPurify.sanitize(ThreadContents);
      const threads = JSON.parse(sessionStorage.getItem("data")) || [];
      const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

      const newThread = {
        thread_name: sanitizedTitle,
        thread_contents: sanitizedContents,
        thread_id: threads.length,
        tags,
        created_at: new Date().toISOString(),
        user: foundUser ? (({ first_name, last_name, email, account_type }) => ({ first_name, last_name, email, account_type }))(foundUser) : null,
        poll: includePoll && pollQuestion && pollOptions.some(option => option.trim() !== '')
        ? { question: DOMPurify.sanitize(pollQuestion), options: pollOptions.map(opt => DOMPurify.sanitize(opt)) }
        : null,
      };

      sessionStorage.setItem("data", JSON.stringify([...threads, newThread]));
      sessionStorage.setItem("tags", JSON.stringify(tags));
      setIsLoading(false);
      goToThread(newThread.thread_id);

      const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewed') || '[]');
      recentlyViewed.unshift({ id: threads.length, title: sanitizedTitle });
      if (recentlyViewed.length > 10) {
        recentlyViewed.pop();
      }
      sessionStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));

      setTags([]);
      setThreadTitle("");
      setThreadContents("");
    }, 3000);
  };

  const isDisabled = isLoading || canSubmit() !== null;

  if (!loggedInUser) {
    return (
     <>
      <div className="overlay">
          <div className="box-holder">
              <div className="overlay-box">
                  <div className="box-content">
                      <div className="box-top">
                        <h2>Please sign up or log in access the creation page!</h2>
                      </div>
                      
                      <div className="box-bottom">
                        <p className="text">
                            You need to be logged in to access this page.
                        </p>
                        <p className="text">
                            Please {' '}
                            <span className="underline" onClick={goToSignUp}>Sign up</span>
                            {' '}
                            or
                            {' '}
                            <span className="underline" onClick={goToLogin}>Log in</span>
                            {' '} to continue.
                        </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="NewThread">
      <div className="NewThread-header">
      <h1 className="text-top">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block mr-2">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.94l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
      </svg>
      Create Your Thread
      </h1>
      <p className="text-subheading">Share your questions, ideas, and start engaging discussions with the community.</p>
      </div>
      <div className="main-content-area">
      <div className="center">
        <motion.div 
          className="fill"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <label htmlFor="questionTitle" className="threadDir"><h1><FontAwesomeIcon icon={faLightbulb} className="fa-icon"/> Question Title</h1></label>
          <p className="subtext">Be clear and concise. What is the core question you want to ask?</p>

     
            <input
            id="questionTitle"
            className="new-input-container1"
            placeholder="Enter Question Title"
            value={ThreadTitle}
            onChange={(e) => handleChange(e.target.value, setThreadTitle, maxTitleLength)}
            style={{ wordWrap: "break-word", whiteSpace: "normal" }}
            required
          />

          <div className="charCounter">{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</div>
        </motion.div>
        <motion.div 
          className="fill"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <label htmlFor="questionDesc" className="threadDir"><h1><FontAwesomeIcon icon={faCommentDots  } className="fa-icon flip"/> Question Description</h1></label>
          <p className="subtext">Provide more details and context. Explain your question or idea thoroughly.</p>
          <ReactQuill
            id="questionDesc"
            ref={quillRef}
            className="new-input-container2"
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

          <div className="charCounter">{getPlainText(ThreadContents).length}/{maxDescLength} characters</div>
        </motion.div>

        <AddTags tags={tags} setTags={setTags} />

        <div className="fill">
          <label htmlFor="tag-input" className="threadTag">
            <h1>Extras</h1>
          </label>
      
          <label className="rule-checkbox">
            <input
              type="checkbox"
              checked={includePoll}
              onChange={handleIncludePollChange}
            />
              <span>
                <FontAwesomeIcon icon={faPoll} className="fa-icon inline-icon mr-1" />
                Include a Poll?
            </span>
          </label>

          <label className="rule-checkbox">
            <input
              type="checkbox"
            />
              <span>
                <FontAwesomeIcon icon={faExclamationCircle} className="fa-icon inline-icon mr-1" />
                Mark as Urgent?
            </span>
          </label>
        </div>

        {includePoll && (
            <CreatePoll
              onPollData={handlePollData} 
            />
          )}

        <div className="loadButton container">
        <button onClick={submitThread} disabled={isDisabled}>
  {isLoading ? (
    <>
      <FontAwesomeIcon icon={faCircleCheck} spin className="inline-icon" /> Submitting...
    </>
  ) : (
    <>
      <FontAwesomeIcon icon={isDisabled ? faCircleXmark : faCircleCheck} className="inline-icon" /> Submit
    </>
  )}
</button>

        </div>
      </div>
      <CreateThreadAside ruleAgreement={ruleAgreement} setRuleAgreement={setRuleAgreement} />
    </div>
    </div>
  );
}