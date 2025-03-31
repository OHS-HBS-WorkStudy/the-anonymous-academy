// Library declaration imports
import React, { useState, useRef, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

// Other modules components imports
import useNavigation from "./useNavigation";
import AddTags from "./AddTags";
import CreateThreadAside from "../screens/sub-screens/CreateThreadAside";

export default function CreateThread() {
  const [ThreadTitle, setThreadTitle] = useState("");
  const [ThreadContents, setThreadContents] = useState("");
  const [tags, setTags] = useState(JSON.parse(sessionStorage.getItem("tags")) || []);
  const [isLoading, setIsLoading] = useState(false);

  const [ruleAgreement, setRuleAgreement] = useState(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser"));

    return foundUser && foundUser.pref && foundUser.pref.ruleAgreement !== undefined
        ? foundUser.pref.ruleAgreement
        : false;
});

useEffect(() => {
    const foundUser = JSON.parse(sessionStorage.getItem("foundUser")) || { pref: {} };
    
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
      };

      sessionStorage.setItem("data", JSON.stringify([...threads, newThread]));
      sessionStorage.setItem("tags", JSON.stringify(tags));
      setIsLoading(false);
      goToThread(newThread.thread_id);
      setTags([]);
      setThreadTitle("");
      setThreadContents("");
    }, 3000);
  };

  if (!loggedInUser) {
    return (
      <div className="overlay">
        <div className="box-holder">
          <div className="overlay-box">
            <div className="box-content">
              <h2>Please sign up or log in to access the creation page!</h2>
              <p>
                You need to be logged in to access this page. Please{" "}
                <span className="underline" onClick={goToSignUp}>Sign up</span> or{" "}
                <span className="underline" onClick={goToLogin}>Log in</span> to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="NewThread">
      <h1 className="NewThread text-top">Create Your Thread</h1>
      <div className="center">
        <div className="fill">
          <label htmlFor="questionTitle" className="threadDir"><h1>Question Title</h1></label>
     
            <input
            id="questionTitle"
            className="input-container"
            placeholder="Enter Question Title"
            value={ThreadTitle}
            onChange={(e) => handleChange(e.target.value, setThreadTitle, maxTitleLength)}
          />

          <div className="charCounter">{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</div>
        </div>
        <div className="fill">
          <label htmlFor="questionDesc" className="threadDir"><h1>Question Description</h1></label>
          <ReactQuill
            id="questionDesc"
            ref={quillRef}
            style={{ width: "100%", minHeight: "160px", overflowY: "auto" }}
            value={ThreadContents}
            onChange={handleQuillChange}
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
        </div>
        <AddTags tags={tags} setTags={setTags} />
        <div className="loadButton container">
          <button
            onClick={submitThread}
            disabled={isLoading || !ruleAgreement || !getPlainText(ThreadTitle) || !getPlainText(ThreadContents)}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      <CreateThreadAside ruleAgreement={ruleAgreement} setRuleAgreement={setRuleAgreement} />
    </div>
  );
}
