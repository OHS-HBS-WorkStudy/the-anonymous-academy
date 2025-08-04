import { useState, useEffect, useMemo, useCallback } from 'react';
import useNavigation from '../Nav Bars/useNavigation.js';

export const useThreadListLogic = () => {
  const { goToNewThread } = useNavigation();

  const allThreads = useMemo(() => {
    const storedData = sessionStorage.getItem("data");
    if (storedData) return JSON.parse(storedData);
    return Array.from({ length: 25 }, (_, i) => ({
      thread_id: i,
      thread_name: `Sample Thread Title ${i + 1}`,
      thread_contents: `This is a sample description for thread number ${i + 1}. It contains some content to demonstrate wrapping and ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      tags: i % 3 === 0 ? ['react', 'mui'] : i % 3 === 1 ? ['javascript', 'webdev'] : ['design', 'ux'],
      created_at: new Date(Date.now() - i * 3600000 * (25 - i)).toISOString(),
      views: Math.floor(Math.random() * 500) + 10,
      user: { account_type: 'User', first_name: 'Anon', last_name: 'User' },
    })).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const [advancedFilters, setAdvancedFilters] = useState({
    sortOptions: { answered: false, views: false, comments: false, likes: false },
    dateRange: { startDate: null, endDate: null },
    tags: [],
    itemsPerPage: 6,
  });

  const [displayedThreadsCount, setDisplayedThreadsCount] = useState(advancedFilters.itemsPerPage);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const filteredAndSortedThreads = useMemo(() => {
    let tempThreads = [...allThreads];

    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      tempThreads = tempThreads.filter(
        (thread) =>
          thread.thread_name.toLowerCase().includes(lowerCaseSearch) ||
          thread.thread_contents.toLowerCase().includes(lowerCaseSearch) ||
          (thread.tags && thread.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch)))
      );
    }

    if (advancedFilters.tags && advancedFilters.tags.length > 0) {
      const lowerCaseAdvancedTags = advancedFilters.tags.map(tag => tag.toLowerCase().replace('#', ''));
      tempThreads = tempThreads.filter(thread =>
        thread.tags && thread.tags.some(threadTag =>
          lowerCaseAdvancedTags.some(advTag => threadTag.toLowerCase().includes(advTag))
        )
      );
    }

    const filterStartDate = advancedFilters.dateRange?.startDate ? new Date(advancedFilters.dateRange.startDate) : null;
    const filterEndDate = advancedFilters.dateRange?.endDate ? new Date(advancedFilters.dateRange.endDate) : null;

    if (filterStartDate || filterEndDate) {
      tempThreads = tempThreads.filter(thread => {
        const threadDate = new Date(thread.created_at);
        let matchesDate = true;
        if (filterStartDate && threadDate < filterStartDate) matchesDate = false;
        if (filterEndDate) {
            const adjustedEndDate = new Date(filterEndDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
            if (threadDate >= adjustedEndDate) matchesDate = false;
        }
        return matchesDate;
      });
    }

    if (sortOrder === 'newest') {
      tempThreads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === 'popular') {
      tempThreads.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
        const { answered, views, comments, likes } = advancedFilters.sortOptions;

        if (views) {
            tempThreads.sort((a, b) => (b.views || 0) - (a.views || 0));
        } else if (comments) {
            tempThreads.sort((a, b) => (b.replies || b.comments || 0) - (a.replies || a.comments || 0));
        } else if (likes) {
            tempThreads.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else if (answered) {
            tempThreads.sort((a, b) => (b.is_answered ? 1 : 0) - (a.is_answered ? 1 : 0));
        }
    }
    return tempThreads;
  }, [allThreads, searchText, sortOrder, advancedFilters]);

  const currentThreads = useMemo(() => {
    return filteredAndSortedThreads.slice(0, displayedThreadsCount);
  }, [filteredAndSortedThreads, displayedThreadsCount]);

  const hasMoreThreads = displayedThreadsCount < filteredAndSortedThreads.length;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText, sortOrder, advancedFilters]);

  useEffect(() => {
    setDisplayedThreadsCount(advancedFilters.itemsPerPage);
  }, [searchText, sortOrder, advancedFilters]);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  const handleSortChange = useCallback((event, newSortOrder) => {
    if (newSortOrder !== null) {
      setSortOrder(newSortOrder);
      setAdvancedFilters(prev => ({
        ...prev,
        sortOptions: { answered: false, views: false, comments: false, likes: false },
      }));
    }
  }, []);

  const handleClearSortToggle = useCallback(() => {
    setSortOrder('newest');
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedThreadsCount(prevCount => prevCount + advancedFilters.itemsPerPage);
      setIsLoading(false);
    }, 300);
  }, [advancedFilters.itemsPerPage]);

  const handleOpenFilterPanel = useCallback(() => {
    setIsFilterPanelOpen(true);
  }, []);

  const handleCloseFilterPanel = useCallback(() => {
    setIsFilterPanelOpen(false);
  }, []);

  const handleApplyAdvancedFilters = useCallback((filters) => {
    setAdvancedFilters(filters);
    if (filters.sortOptions.views || filters.sortOptions.comments || filters.sortOptions.likes || filters.sortOptions.answered) {
        setSortOrder('custom');
    } else if (sortOrder === 'custom') {
        setSortOrder('newest');
    }
    setDisplayedThreadsCount(filters.itemsPerPage);
  }, [sortOrder]);

  const handleClearAllFilters = useCallback(() => {
    setSearchText('');
    setSortOrder('newest');
    setAdvancedFilters({
      sortOptions: { answered: false, views: false, comments: false, likes: false },
      dateRange: { startDate: null, endDate: null },
      tags: [],
      itemsPerPage: 6,
    });
  }, []);

  const areAdvancedFiltersActive = useMemo(() => {
    const { sortOptions, dateRange, tags, itemsPerPage } = advancedFilters;
    const defaultSortOptions = { answered: false, views: false, comments: false, likes: false };
    const defaultDateRange = { startDate: null, endDate: null };

    const sortOptionsChanged = Object.keys(sortOptions).some(key => sortOptions[key] !== defaultSortOptions[key]);
    const dateRangeChanged = dateRange.startDate !== defaultDateRange.startDate || dateRange.endDate !== defaultDateRange.endDate;
    const tagsChanged = tags.length > 0;
    const itemsPerPageChanged = itemsPerPage !== 6;

    return sortOptionsChanged || dateRangeChanged || tagsChanged || itemsPerPageChanged || searchText !== '' || sortOrder !== 'newest';
  }, [advancedFilters, searchText, sortOrder]);

  return {
    goToNewThread,
    allThreads,
    searchText,
    sortOrder,
    advancedFilters,
    isLoading,
    isFilterPanelOpen,
    filteredAndSortedThreads,
    currentThreads,
    hasMoreThreads,
    handleSearchChange,
    handleClearSearch,
    handleSortChange,
    handleClearSortToggle,
    handleLoadMore,
    handleOpenFilterPanel,
    handleCloseFilterPanel,
    handleApplyAdvancedFilters,
    handleClearAllFilters,
    areAdvancedFiltersActive,
  };
};
