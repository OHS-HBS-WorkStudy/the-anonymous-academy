import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDatePicker from "./AnimatedCal";

import AnimatedDropdown from "./AnimatedDropdown";
import CompactDropdown from "./CompactDropdown";
import PageNavigation from "./PageNav";


const dropdownVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      scaleY: { stiffness: 100, damping: 20 },
      opacity: { duration: 0.1 },
    },
    originY: 0,
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      scaleY: { stiffness: 100, damping: 20 },
      opacity: { duration: 0.1 },
    },
    originY: 0,
  },
};


export default function ThreadFilter() {
  const [isEditing, setIsEditing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const [startDate, setStartDate] = useState(null);

  const [threadStatus, setThreadStatus] = useState("");
  const [threadDate, setThreadDate] = useState("");
  const [threadSize, setThreadSize] = useState("");
  const [threadTag, setThreadTag] = useState("");

  const [threads, setThreads] = useState(() => {
    const storedData = sessionStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const trendingTags = ["#Math | Threads 30", "#English | Threads 27", "#Science | Threads 19", "#Social Studies | Threads 18"];
  
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const tagOptions = [
    { value: "__title__", label: "Trending 🔥", isLabel: true },
    ...trendingTags.map(tagString => {
      const [labelPart] = tagString.split(" |");
      return { value: labelPart.trim().toLowerCase(), label: labelPart.trim() };
    })
  ];
  
  const statusOptions = [
    { value: "__title__", label: "Filter Status", isLabel: true },
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
    { value: "Pinned", label: "Pinned" },
  ];
  
  const dataOptions = [
    { value: "__title__", label: "Sort By", isLabel: true },
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Trending", label: "Trending" },
    { value: "Active", label: "Active" },
  ];
  
  const listOptions = [
    { value: "__title__", label: "Items Per Page", isLabel: true },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
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
          name="threadTags"
          options={tagOptions}
          selectedValue={threadTag} 
          onChange={(e) => setThreadTag(e.target.value)}
        />

        <CompactDropdown
          name="threadSize"
          options={listOptions}
          selectedValue={threadSize} 
          onChange={(e) => setThreadSize(e.target.value)}
        />

        <CompactDropdown
          name="threadStatus"
          options={statusOptions}
          selectedValue={threadStatus} 
          onChange={(e) => setThreadStatus(e.target.value)}
        />


        <button
          ref={filterButtonRef}
          onClick={toggleOpen}
          aria-expanded={filterOpen ? "true" : "false"}
          className="filter-button"
        >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
          {screenWidth >= 438 && "Filter"}
        </button>

        <div className="listman">
          <PageNavigation />
        </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="motion-dropdown"
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="motion-dropdown-section">
                <h3 className="motion-dropdown-title">Advance Sort By</h3>
                <label htmlFor="sortAnswered">
                  <input type="checkbox" id="sortAnswered" name="sortBy" value="answered" />
                  Answered
                </label>
                <label htmlFor="sortViews">
                  <input type="checkbox" id="sortViews" name="sortBy" value="views" />
                  Most Views
                </label>
                <label htmlFor="sortComments">
                  <input type="checkbox" id="sortComments" name="sortBy" value="comments" />
                  Most Comments
                </label>
                <label htmlFor="sortLikes">
                  <input type="checkbox" id="sortLikes" name="sortBy" value="likes" />
                  Most Likes
                </label>
              </div>

              <div className="motion-dropdown-section">
                <h3 className="motion-dropdown-title">Advance Date Filter</h3>
                    <AnimatedDatePicker
                      name="startDate"
                      label="Select date..."
                       className="tag-input"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
              </div>

              <div className="motion-dropdown-section">
                <h3 className="motion-dropdown-title">Custom Tags</h3>
                <input
                  ref={inputRef}
                  id="customtag"
                  className="tag-input"
                  type="text"
                  placeholder={tags.length === 0 ? "Enter Tags..." : "#"}
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
              </div>

              <div className="motion-dropdown-section">
                <h3 className="motion-dropdown-title">Custom Items Per Page</h3>
                <input
                  type="number"
                  min="5"
                  placeholder="10"
                  id="customsize"
                  name="listSize"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
      </div>
  );
}                