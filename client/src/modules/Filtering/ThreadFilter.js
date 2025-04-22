import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDatePicker from "./AnimatedCal";

import AnimatedDropdown from "./AnimatedDropdown";
import CompactDropdown from "./CompactDropdown";
export default function ThreadFilter() {
  const [isEditing, setIsEditing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [startDate, setStartDate] = useState(null);

  const [threadStatus, setThreadStatus] = useState("");
  const [threadDate, setThreadDate] = useState("");
  const [threadSize, setThreadSize] = useState("");

  const [threads, setThreads] = useState(() => {
    const storedData = sessionStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const statusOptions = [
    { value: "", label: "None" },
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
    { value: "Pinned", label: "Pinned" },
  ];

  const dataOptions = [
    { value: "", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Trending", label: "Trending" },
    { value: "Active", label: "Active" },
  ];

  const listOptions = [
    { value: "10", label: "10" },
    { value: "", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
 
  const [currentPage, setCurrentPage] = useState(() => {
    if (threads.length === 0) {
      return 0;
    } else {
      return 1;
    }
  });

  const itemsPerPage = 1;
  const [inputPage, setInputPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
 
 
 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      let newTag = inputValue.trim();
      if (!newTag.startsWith('#')) {
        newTag = '#' + newTag;
      }
 
 
      setTags([...tags, newTag]);
      setInputValue('');
    }
  };
 
 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
 
 
  const removeTag = (index) => {
    setTags(tags.filter((t, i) => i !== index));
  };
 
 
  const totalPages = Math.ceil(threads.length / itemsPerPage);
 
 
  const handleInputBlur = () => {
    const page = Math.max(1, Math.min(totalPages, parseInt(inputPage, 10) || 1));
    setCurrentPage(page);
    setInputPage(page);
    setIsEditing(false);
  };
 
 
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputBlur();
    }
  };
 
 
  const handleSpanClick = () => {
    setIsEditing(true);
  };
 
 
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
 
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterButtonRef.current && !filterButtonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        event.target !== document.scrollingElement
      ) {
        setFilterOpen(false);
      }
    };
 
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
 
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    const storedData = sessionStorage.getItem("data");
    if (storedData) {
      const allThreads = JSON.parse(storedData);
      const filteredThreads = selectedStatus
        ? allThreads.filter(thread => thread.status === selectedStatus)
        : allThreads;
      setThreads(filteredThreads);
    }
  };
 
 
  const deleteList = () => {
    sessionStorage.removeItem("data");
    setThreads([]);
    window.location.reload();
  };
 
 
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
 
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
      <div className="grid-header-area">
      <div className="thread-filter">
        <div className={`grid-header ${filterOpen ? "open" : ""}`}>

        <CompactDropdown
          name="threadDate"
          options={dataOptions}
          selectedValue={threadDate} 
          onChange={(e) => setThreadDate(e.target.value)}
        />

        <CompactDropdown
          name="threadSize"
          options={listOptions}
          selectedValue={threadSize} 
          onChange={(e) => setThreadSize(e.target.value)}
        />

        <button
          ref={filterButtonRef}
          onClick={toggleFilter}
          aria-expanded={filterOpen ? "true" : "false"}
          className="filter-button"
        >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
          {screenWidth >= 438 && "Filter"}
        </button>

        <div className="listman">
          <button
          className="listpage-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => threads.length >= 1 ? Math.max(prev - 1, 1) : 0)}
          >
          &lt;
          </button>
          <span className="listpage-text">
          Page{' '}
          {isEditing ? (
            <input
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyPress}
            style={{
              width: '40px',
              textAlign: 'center',
              border: 'none',
              borderBottom: '1px solid black',
              outline: 'none',
              fontSize: 'inherit',
            }}
            min="0"
            max={totalPages}
            autoFocus
            />
          ) : (
            <span onClick={handleSpanClick} style={{ cursor: 'pointer', borderBottom: '1.5px ridge white', textAlign: 'center' }}>
            {currentPage}
            </span>
          )}{' '}
          of {totalPages}
          </span>
          <button
          className="listpage-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
          &gt;
          </button>
        </div>
        </div>

              <div
                ref={dropdownRef}
                className={`dropdown-content ${filterOpen ? "open" : ""}`}
              >
                <div className="dropdown col1">
                  <label htmlFor="categoryFilter" style={{ display: "none" }}>
                    Category:
                  </label>

                  <div className="left">
                    <h3>Trending Tags:</h3>
                    <input type="checkbox" id="math" name="category" value="math" />
                    <label htmlFor="math">#Math | Threads 30</label>

                    <input type="checkbox" id="english" name="category" value="english" />
                    <label htmlFor="english">#English | Threads 27</label>

                    <input type="checkbox" id="science" name="category" value="science" />
                    <label htmlFor="science">#Science | Threads 19</label>

                    <input type="checkbox" id="socialstudies" name="category" value="socialstudies" />
                    <label htmlFor="socialstudies">#Social Studies | Threads 18</label>

                    <h3>Thread Status:</h3>
                        <label htmlFor="statusFilter" style={{ display: "none" }}>
                          Thread Status:
                        </label>
                        
                          <AnimatedDropdown
                            name="threadStatus"
                            label="Select a status..."
                            options={statusOptions}
                            onChange={(e) => setThreadStatus(e.target.value)}
                          />

                      
                    </div>
      
                </div>
            

                      <div className="dropdown col2">
                        <div className="left">
                        <h3>Date Filter:</h3>
                        <label htmlFor="dateFilter" style={{ display: "none" }}>
                        Date:
                        </label>
                        <div>
          

                        <AnimatedDatePicker
                          name="startDate"
                          label="Select date..."
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        </div>


                        <h3>Sort</h3>
                        <label htmlFor="sortFilter" style={{ display: "none" }}>
                        Sort By:
                        </label>
                        <div>
                          <input type="checkbox" id="sortAnswered" name="sortBy" value="answered" />
                          <label htmlFor="sortAnswered">Answered</label>

                          <input type="radio" id="sortViews" name="sortBy" value="views" />
                          <label htmlFor="sortViews">Most Views</label>

                          <input type="radio" id="sortComments" name="sortBy" value="comments" />
                          <label htmlFor="sortComments">Most Comments</label>

                          <input type="radio" id="sortLikes" name="sortBy" value="likes" />
                          <label htmlFor="sortLikes">Most Likes</label>
                        </div>

                      </div>
                      </div>
                      <div className="dropdown col3">
                      
                        <div className="left">

                        <h3 className="tag-input-text">Custom Tags:</h3>
                        <input
                          ref={inputRef}
                          id="customtag"
                          className="tag-input"
                          type="text"
                          placeholder={tags.length === 0 ? "Enter Tags..." : ""}
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                        />

                        <div className="tag-input-container">
                        {tags.map((tag, index) => (
                          <span onClick={() => removeTag(index)} key={index} className="tag">
                            {tag}
                            <button>x</button>
                          </span>
                        ))}
                        </div>
                      

                          <div>
                            <h3>Custom List Size:</h3>
                            <label htmlFor="listFilter" style={{ display: "none" }}>
                              Custom List Size
                            </label>
                            <input type="number" min="5" placeholder="10" id="customsize" name="listSize" />
                          </div>

                        <motion.button onClick={deleteList} className="apply-button" variants={buttonVariants} whileHover="hover" whileTap="tap">
                        Apply
                        </motion.button>

                        <motion.button onClick={deleteList} className="delete-button" variants={buttonVariants} whileHover="hover" whileTap="tap">
                        Clear
                        </motion.button>
                      <button onClick={() => deleteList()}>Clear List</button>
                        </div>
            </div>
          </div>
      </div>
   </div>
  );
}                