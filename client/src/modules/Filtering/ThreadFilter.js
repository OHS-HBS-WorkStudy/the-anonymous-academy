import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDatePicker from "./AnimatedCal";

import CompactDropdown from "./CompactDropdown";


const breakpoints = {
  large: 960, 
  medium: 600,
  small: 425,  
};

const dropdownVariants = {
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  closed: {
    x: '100%',
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};



export default function ThreadFilter() {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const gridHeaderRef = useRef(null);

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
  
  const tagOptions = [
    { value: "__title__", label: "Trending 🔥", isLabel: true },
    ...trendingTags.map(tagString => {
      const [labelPart] = tagString.split(" |");
      return { value: labelPart.trim().toLowerCase(), label: labelPart.trim() };
    })
  ];
  
  const statusOptions = [
    { value: "__title__", label: "Thread Status", isLabel: true },
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
 
  const [showCollapsedDropdown, setShowCollapsedDropdown] = useState(false); 

  const toggleCollapsedDropdown = () => {
    setShowCollapsedDropdown(!showCollapsedDropdown);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClickOutside = (event) => {
    if (showCollapsedDropdown && gridHeaderRef.current && !gridHeaderRef.current.contains(event.target)) {
      setShowCollapsedDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCollapsedDropdown,]);
 

    return (
      <div className="grid-header-area">
      <div className="thread-filter">
        <div ref={gridHeaderRef} className={`grid-header ${filterOpen ? "open" : ""}`}>

        {screenWidth >= breakpoints.large ? (
        <div style={{ display: 'flex', gap: '10px' }}>
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
        </div>
      ) : screenWidth >= breakpoints.medium ? (
        <div className="collapsed-container">
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
          <div className="vertical-dots-wrapper" onClick={toggleCollapsedDropdown}>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#5f6368" style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', overflow: 'visible', width: '24px', height: '24px' }}>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <AnimatePresence>
            {showCollapsedDropdown && (
              <motion.div
                className="collapsed-dropdown-options"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="dropdown-right-align">
                  <CompactDropdown
                    name="threadStatus"
                    options={statusOptions}
                    selectedValue={threadStatus}
                    onChange={(e) => setThreadStatus(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : screenWidth >= breakpoints.small ? (
        <div className="collapsed-container">
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
          <div className="vertical-dots-wrapper" onClick={toggleCollapsedDropdown}>
            {/* Dots SVG */}
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#5f6368" style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', overflow: 'visible', width: '24px', height: '24px' }}>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <AnimatePresence>
            {showCollapsedDropdown && (
              <motion.div
                className="collapsed-dropdown-options"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="dropdown-right-align">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="collapsed-container">
          <CompactDropdown
            name="threadDate"
            options={dataOptions}
            selectedValue={threadDate}
            onChange={(e) => setThreadDate(e.target.value)}
          />
          <div className="vertical-dots-wrapper" onClick={toggleCollapsedDropdown}>
            {/* Dots SVG */}
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="#5f6368" style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', overflow: 'visible', width: '24px', height: '24px' }}>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
          <AnimatePresence>
            {showCollapsedDropdown && (
              <motion.div
                className="collapsed-dropdown-options"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="dropdown-right-align">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

        <button
          ref={filterButtonRef}
          onClick={toggleOpen}
          aria-expanded={filterOpen ? "true" : "false"}
          className="filter-button"
        >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
          {screenWidth >= 438 && "Filter"}
        </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="motion-dropdown"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >

                <button 
                  className="close-button" 
                  onClick={() => setIsOpen(false)} 
                  aria-label="Close Filter Panel"
                >
                  ✕
                </button>

                    {/* Sort Section */}
            <div className="motion-dropdown-section top">
              <div className="motion-dropdown-header">
                <h3 className="motion-dropdown-title">Sort Options</h3>
                <button className="clear-button">Clear</button>
              </div>
              {[
                { id: 'sortAnswered', label: 'Answered' },
                { id: 'sortViews', label: 'Most Views' },
                { id: 'sortComments', label: 'Most Comments' },
                { id: 'sortLikes', label: 'Most Likes' },
              ].map(({ id, label }) => (
                <label htmlFor={id} key={id}>
                  <input type="checkbox" id={id} name="sortBy" value={id.replace('sort', '').toLowerCase()} />
                  {label}
                </label>
              ))}
            </div>

            {/* Date Range Filter */}
            <div className="motion-dropdown-section">
              <div className="motion-dropdown-header">
                <h3 className="motion-dropdown-title">Date Range</h3>
                <button className="clear-button">Clear</button>
              </div>
              <div className="date-range">
                <div className="left"> 
                  <label htmlFor="fromDate">From</label>
                  <AnimatedDatePicker name="fromDate" id="fromDate" placeholder="Start date" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="right">
                  <label htmlFor="toDate">To</label>
                  <AnimatedDatePicker name="toDate" id="toDate" placeholder="End date" />
                </div>
              </div>
              <div className="quick-range">
                {['Today', 'Last 7 Days', 'This Month', 'Last Month'].map(option => (
                  <button key={option}>{option}</button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="motion-dropdown-section">
              <div className="motion-dropdown-header">
                <h3 className="motion-dropdown-title">Tags</h3>
                <button className="clear-button">Clear</button>
              </div>
              <input
                ref={inputRef}
                className="tag-input"
                type="text"
                placeholder={tags.length === 0 ? "Enter Tags..." : "#"}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div className="tag-input-container">
                {tags.map((tag, index) => (
                  <span key={index} className="tag" onClick={() => removeTag(index)}>
                    {tag} <button>x</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Items Per Page */}
            <div className="motion-dropdown-section">
              <div className="motion-dropdown-header">
                <h3 className="motion-dropdown-title">Items Per Page</h3>
                <button className="clear-button">Clear</button>
              </div>
              <input
                type="number"
                min="5"
                placeholder="e.g., 10"
                id="customsize"
                name="listSize"
              />
            </div>

            {/* Apply Button */}
            <div className="motion-dropdown-footer">
              <button className="apply-button">Apply Filters</button>
            </div>

                  </motion.div>
                </>
              )}
        </AnimatePresence>
      </div>
    </div>
  );
}                

