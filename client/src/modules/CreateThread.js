// Library declaration imports
import React, { useState, useRef, useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

// Other modules components imports
import useNavigation from "./useNavigation";
import AddTags from "./AddTags";

export default function CreateThread() {
  const [ThreadTitle, setThreadTitle] = useState("");
  const [ThreadContents, setThreadContents] = useState("");
  const [tags, setTags] = useState(JSON.parse(sessionStorage.getItem("tags")) || []);
  const [isLoading, setIsLoading] = useState(false);

  const { goToThread } = useNavigation();

  const maxTitleLength = 200;
  const maxDescLength = 10000;

  const quillRef = useRef(null);

  useEffect(() => {
    const savedTitle = sessionStorage.getItem("threadTitle");
    const savedContents = sessionStorage.getItem("threadContents");

    if (savedTitle) {
      setThreadTitle(savedTitle);
    }
    if (savedContents) {
      setThreadContents(savedContents);
    }
  }, [setThreadTitle, setThreadContents]);

  useEffect(() => {
    sessionStorage.setItem("threadTitle", ThreadTitle);
    sessionStorage.setItem("threadContents", ThreadContents);
  }, [ThreadTitle, ThreadContents]);

  const getPlainText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.innerText || tempDiv.textContent;
  };

  const handleQuillChange = (value, setValue, maxLength, quillRef) => {
    const plainText = getPlainText(value);

    if (plainText.length <= maxLength) {
      setValue(value);
    } else {
      const quillText = quillRef.current.getEditor().getContents();
      const cutQuillText = quillText.slice(0, maxLength);
      setValue(cutQuillText);

      const editor = quillRef.current.getEditor();
      editor.setContents(cutQuillText);
      editor.setSelection(maxLength);
    }
  };

  const handleChange = (value, setValue, maxLength) => {
    const plainText = getPlainText(value);
    if (plainText.length <= maxLength) {
      setValue(value);
    } else {
      setValue(value.substring(0, maxLength));
    }
  };

  const editorStyle = {
    width: "100%",
    minHeight: "160px",
    overflowY: "auto",
    border: "black",
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

  const submitThread = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
        const sanitizedTitle = DOMPurify.sanitize(ThreadTitle);
        const sanitizedContents = DOMPurify.sanitize(ThreadContents);

        let thread = JSON.parse(sessionStorage.getItem("data")) || [];
        if (!Array.isArray(thread)) {
            thread = [];
        }

        let users = JSON.parse(sessionStorage.getItem("user")) || [];
        if (!Array.isArray(users)) {
            users = [];
        }

        const currentUserEmail = sessionStorage.getItem("currentUserEmail");
        let currentUser = null;

        if (currentUserEmail && users.length > 0) {
            currentUser = users.find((user) => user.email === currentUserEmail);
        }

        let newId = null;

        if (JSON.parse(sessionStorage.getItem("data")) === null || JSON.parse(sessionStorage.getItem("data")).length === 0) {
            newId = 0;
        } else {
            newId = JSON.parse(sessionStorage.getItem("data")).length + 1;
        }

        const now = new Date();
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedTime = now.toLocaleDateString('en-US', options);

        let data = {
            thread_name: sanitizedTitle,
            thread_contents: sanitizedContents,
            thread_id: newId,
            tags: tags,
            created_at: formattedTime,
            account: currentUser ? currentUser.account_type : "", 
        };

        console.log(data);

        thread.push(data);
        sessionStorage.setItem("data", JSON.stringify(thread));

        sessionStorage.setItem("tags", JSON.stringify(tags));

        setIsLoading(false);
        goToThread(data.thread_id);

        //Clear data
        setTags([]);
        setThreadTitle([]);
        setThreadContents([]);
    }, 3000);
};

  return (
    <>
      <div className="NewThread">
        <div className="center">
          <div className="fill">
            <label htmlFor="questionTitle" className="threadDir">
              <h1>Question Title</h1>
            </label>
          </div>

          <div className="input-container text-box ql-container">
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
            <label htmlFor="questionDesc" className="threadDir">
              <h1>Question Description</h1>
            </label>
          </div>

          <div className="input-container text-box ql-container">
            <ReactQuill
              id="questionDesc"
              ref={quillRef}
              style={editorStyle}
              value={ThreadContents}
              onChange={(value) => handleQuillChange(value, setThreadContents, maxDescLength, quillRef)}
              modules={modules}
            />
            <div className="charCounter">{getPlainText(ThreadContents).length}/{maxDescLength} characters</div>
          </div>

          <AddTags tags={tags} setTags={setTags} /> 

          <div className="loadButton container">
            <div className={`loadButton ${isLoading ? "loading" : ""}`}>
              <button onClick={submitThread} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
