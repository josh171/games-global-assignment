import React, { useEffect, useRef, useState } from 'react';
import { faChevronLeft, faChevronRight, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaultFilters } from '../App';
import FilterList from './FilterList';

const Filters = ({ filters, setFilters, allAutomations }) => {
  const [showSiteOptions, setShowSiteOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const siteDropdownRef = useRef(null);

  const [selectedSiteOptions, setSelectedSiteOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoryDropdownRef = useRef(null);

  const [sites, setSites] = useState([]);
  const filtersContainerRef = useRef(null);

  // Remove duplicate sites for filter options
  useEffect(() => {
    const uniqueSiteTitles = Array.from(
      new Set(allAutomations.map((automation) => automation.sites[0].title))
    );
    setSites(uniqueSiteTitles);
  }, []);

  // Function to scroll user to start/end of filters
  const handleArrowClick = (direction) => {
    const container = filtersContainerRef.current;

    if (!container) return;

    if (direction === 'left') {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
  };

  // Reset to initial values
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSelectedSiteOptions([]);
    setShowSiteOptions(false);
    setSelectedCategory('');
    setShowCategoryOptions(false);
  };

  // Function to close both dropdown lists if clicked outside of element
  const handleOutsideClick = (event) => {
    if (
      siteDropdownRef.current &&
      !siteDropdownRef.current.contains(event.target) &&
      !event.target.closest('.filter-dropdown')
    ) {
      setShowSiteOptions(false);
    }

    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target) &&
      !event.target.closest('.filter-dropdown')
    ) {
      setShowCategoryOptions(false);
    }
  };

  // To trigger the above function
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <div className="filters-container">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="arrow-icon"
        onClick={() => handleArrowClick('left')}
      />

      <FilterList
        filters={filters}
        setFilters={setFilters}
        sites={sites}
        selectedSiteOptions={selectedSiteOptions}
        setSelectedSiteOptions={setSelectedSiteOptions}
        filtersContainerRef={filtersContainerRef}
        siteDropdownRef={siteDropdownRef}
        categoryDropdownRef={categoryDropdownRef}
        showSiteOptions={showSiteOptions}
        setShowSiteOptions={setShowSiteOptions}
        showCategoryOptions={showCategoryOptions}
        setShowCategoryOptions={setShowCategoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FontAwesomeIcon
        icon={faChevronRight}
        className="arrow-icon"
        onClick={() => handleArrowClick('right')}
      />

      <FontAwesomeIcon
        icon={faRotateLeft}
        className="arrow-icon"
        onClick={() => handleResetFilters()}
      />
    </div>
  );
};

export default Filters;
