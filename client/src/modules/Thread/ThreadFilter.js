import { useState, useRef, useEffect } from "react";

export default function ThreadFilter() {
  const [isEditing, setIsEditing] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [threads, setThreads] = useState(() => {
    const storedData = sessionStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
 
 
 
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
        <div className="grid-header-title">Manager</div>
        <div className="dropdown">
          <label htmlFor="tagFilter" style={{ display: "none" }}>
          Categories
          </label>
        </div>

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


                    <h3 className="tag-input-text">Custom Tag:</h3>
                      
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

                    {tags.length > 0 && 
                      <div className="tag-input-container">
                        {tags.map((tag, index) => (
                          <span onClick={() => removeTag(index)} key={index} className="tag">
                            {tag}
                            <button>x</button>
                          </span>
                        ))}
                        </div>
                      }
                    </div>
      
                </div>
            

                      <div className="dropdown col2">
                        <div className="left">
                        <h3>Date Filter:</h3>
                        <label htmlFor="dateFilter" style={{ display: "none" }}>
                        Date:
                        </label>
                        <div>
                        <input type="radio" id="newest" name="date" value="newest"  />
                        <label htmlFor="newest">Newest</label>

                        <input type="radio" id="oldest" name="date" value="oldest"  />
                        <label htmlFor="oldest">Oldest</label>

                        <input type="radio" id="trending" name="date" value="trending" />
                        <label htmlFor="trending">Trending</label>

                        <input type="date" id="startDate" name="startDate" className="date-input" />
                        </div>


                        <h3>Sort</h3>
                        <label htmlFor="sortFilter" style={{ display: "none" }}>
                        Sort By:
                        </label>
                        <div>
                          <input type="radio" id="sortAnswered" name="sortBy" value="answered" />
                          <label htmlFor="sortAnswered">Answered</label>

                          <input type="radio" id="sortViews" name="sortBy" value="views" />
                          <label htmlFor="sortViews">Most Views</label>

                          <input type="radio" id="sortComments" name="sortBy" value="comments" />
                          <label htmlFor="sortComments">Most Comments</label>

                          <input type="radio" id="sortLikes" name="sortBy" value="likes" />
                          <label htmlFor="sortLikes">Most Likes</label>
                        </div>

                        <button onClick={() => deleteList()}>Clear List</button>
                        
                      </div>

                      <div className="dropdown col3">
                      
                        <div className="left">
                        <h3>Thread Status:</h3>
                        <label htmlFor="statusFilter" style={{ display: "none" }}>
                        Thread Status:
                        </label>
                        
                        <select 
                            id="selectStatus" 
                            className="select-status" 
                            onChange={(e) => {
                              // Handle select change logic
                            }}
                          >
                            <option value="" selected>
                              Select a status...
                            </option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="pinned">Pinned</option>
                          </select>

                          <h3>List Size:</h3>
                        <label htmlFor="listFilter" style={{ display: "none" }}>
                        listSize:
                        </label>
                      
                        <div>
                        <input type="radio" id="thread10" name="listSize" value="10" />
                        <label htmlFor="thread10">10</label>

                        <input type="radio" id="thread25" name="listSize" value="25" />
                        <label htmlFor="thread25">25</label>

                        <input type="radio" id="thread50" name="listSize" value="50" />
                        <label htmlFor="thread50">50</label>

                        <input type="radio" id="thread100" name="listSize" value="100" />
                        <label htmlFor="thread100">100</label>

                        <h3>Custom Size:</h3>
                        <input type="number" id="customsize" name="listSize" />
                       
                        </div>
                        
                        </div>

                       
          </div>
        </div>
        </div>
        </div>
        </div>
  );
}                