import React, { useState, useRef, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';
import useNavigation from "./useNavigation";

export default function CreateThread() {
    const[ThreadTitle, setThreadTitle] = useState("");
    const [ThreadContents, setThreadContents] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { goToThread } = useNavigation();


    const maxTitleLength = 200;
    const maxDescLength = 10000;

    const quillRef = useRef(null);

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
        [{ header: "1" }, { header: "2" },],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        [{ indent: "-1" }, { indent: "+1" }, { background: [] }],
        ["clean"], 
      ]
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
            
            let newId = undefined;

            if (JSON.parse(sessionStorage.getItem("data")) === null || JSON.parse(sessionStorage.getItem("data")).length === 0) {
                 newId = 0;
            } else {
                 newId = JSON.parse(sessionStorage.getItem("data")).length + 1;
            }
          
            let data = {
                thread_name: sanitizedTitle,
                thread_contents: sanitizedContents,
                thread_id: newId,
            };

            console.log(data);

            thread.push(data);
            sessionStorage.setItem("data", JSON.stringify(thread));

            setIsLoading(false);

            goToThread(data.thread_id)
        }, 3000);
    };
  
    return (
      <>
        <div className="NewThread">
          <div className="center">
            <div className="fill">
                <label htmlFor="questionTitle" className="threadDir"><h1>Question Title</h1></label>
            </div>

            <div className="input-container text-box ql-container">
              <input
                id="questionTitle"
                className="input-container"
                placeholder="Enter Question Title"
                value={ThreadTitle}
                onChange={(e) =>
                  handleChange(e.target.value, setThreadTitle, maxTitleLength)
                }
              />
              <div className="charCounter">{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</div>
            </div>
  
            <div className="fill">
                <label htmlFor="questionDesc" className="threadDir"><h1>Question Description</h1></label>
            </div>

            <div className="input-container text-box ql-container">
            
              <ReactQuill
                id="questionDesc"
                ref={quillRef}
                style={editorStyle}
                value={ThreadContents}
                onChange={(value) =>
                  handleQuillChange(value, setThreadContents, maxDescLength, quillRef)
                }
                modules={modules}
              />
              <div className="charCounter">{getPlainText(ThreadContents).length}/{maxDescLength} characters</div>
            </div>
  
            <div className="loadButton container">
            <div className={`loadButton ${isLoading ? "loading" : ""}`}>
              <button onClick={submitThread} disabled={isLoading} >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
            </div>
          </div>
        </div>
      </>
    );
  }