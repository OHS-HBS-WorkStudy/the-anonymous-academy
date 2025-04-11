import { useState, useEffect } from 'react';

export default function AddTags({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("#");
  const [tagRemoving, setTagRemoving] = useState(null);

  useEffect(() => {
    const savedTags = sessionStorage.getItem("tags");
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, [setTags]);

  useEffect(() => {
    sessionStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const tagInputChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("#")) {
      setInputValue("#");
    } else {
      setInputValue(value);
    }
  };

  const enterCheck = (e) => {
    if (e.key === "Enter") {
      const tagContent = inputValue.trim();
      if (tagContent.length > 1 && !tags.includes(tagContent)) {
        const updatedTags = [...tags, tagContent];
        setTags(updatedTags);
        setInputValue("#");
        return tagContent;
      } else {
        alert("Tag must be unique and not empty.");
      }
    }
  };

  const removeTag = (index) => {
    setTagRemoving(index);
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setTagRemoving(null);
  };

  return (
    <div className="fill">
      <label htmlFor="tag-input" className="threadTag">
        <h1>Tags</h1>
      </label>

      <div className="tag-input-container text-box ql-container">
        <div className='text'>
            Enter one tag at a time. Press <strong>Enter</strong> to add.
        </div>
        

        <input
          id="tag-input"
          className="input-container"
          type="text"
          value={inputValue}
          onChange={tagInputChange}
          onKeyDown={enterCheck}
          placeholder="Press Enter to Add Tag"
        />
      </div>

      {tags.length > 0 && (
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`tag ${tagRemoving === index ? "removing" : ""}`}
              onClick={() => removeTag(index)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}