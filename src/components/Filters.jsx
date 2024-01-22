import React, { useEffect, useRef, useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faRightLeft,
  faRotateLeft,
  faTv,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Filters = ({ filter, setFilter }) => {
  const [showSiteOptions, setShowSiteOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const siteDropdownRef = useRef(null);

  const [selectedSiteOptions, setSelectedSiteOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoryDropdownRef = useRef(null);

  const siteOptions = ['ProductHunt', 'Indeed', 'LinkedIn', 'Eventbrite'];

  const handleSiteOptionClick = (option) => {
    if (selectedSiteOptions.includes(option)) {
      setSelectedSiteOptions((prevOptions) =>
        prevOptions.filter((siteOption) => siteOption !== option)
      );
    } else {
      setSelectedSiteOptions((prevOptions) => [...prevOptions, option]);
    }

    setFilter(option);
  };

  const handleClickOutside = (event) => {
    if (
      siteDropdownRef.current &&
      !siteDropdownRef.current.contains(event.target) &&
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target)
    ) {
      setShowSiteOptions(false);
      setShowCategoryOptions(false);
    }
  };

  const handleResetFilters = () => {
    setFilter('');
    setSelectedSiteOptions([]);
    setShowSiteOptions(false);
    setSelectedCategory('');
    setShowCategoryOptions(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="filters-container">
      <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />

      <div className="filters">
        <div
          className={`filter ${filter === 'scrape' && 'selected'}`}
          onClick={() => setFilter(filter === 'scrape' ? '' : 'scrape')}>
          <FontAwesomeIcon icon={faRightLeft} className="extract-icon fa-icon" /> Extract Data
        </div>

        <div
          className={`filter ${filter === 'monitor' && 'selected'}`}
          onClick={() => setFilter(filter === 'monitor' ? '' : 'monitor')}>
          <FontAwesomeIcon icon={faTv} className="fa-icon" /> Monitoring
        </div>

        <div>
          <div
            className={`filter ${filter.startsWith('site') && 'selected'}`}
            onClick={() => setShowSiteOptions(!showSiteOptions)}>
            <FontAwesomeIcon icon={faPlus} className="fa-icon" /> Filter By Site
          </div>
          {showSiteOptions && (
            <div ref={siteDropdownRef} className={`dropdown ${showSiteOptions && 'show'}`}>
              {siteOptions.map((option) => {
                const isOptionSelected = selectedSiteOptions.find(
                  (siteOption) => siteOption === option
                );

                return (
                  <div
                    key={option}
                    className={`dropdown-option ${isOptionSelected && 'selected'}`}
                    onClick={() => handleSiteOptionClick(option)}>
                    <span className="text">{option}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {selectedSiteOptions.map((option) => (
          <div
            className="filter selected"
            key={option}
            onClick={() => handleSiteOptionClick(option)}>
            {option}
            <FontAwesomeIcon icon={faXmark} className="select-filter-icon" />
          </div>
        ))}

        <div>
          <div
            className={`filter ${filter === 'category' && 'selected'}`}
            onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
            <FontAwesomeIcon icon={faPlus} className="fa-icon" /> Filter By Category
          </div>
          {showCategoryOptions && (
            <div ref={categoryDropdownRef} className={`dropdown ${showCategoryOptions && 'show'}`}>
              {['SEO', 'Competitive Intelligence'].map((category) => (
                <div
                  key={category}
                  className={`dropdown-option ${selectedCategory === category && 'selected'}`}
                  onClick={() => setSelectedCategory(category)}>
                  <span className="text">{category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedCategory && (
          <div className="filter selected" onClick={() => setSelectedCategory('')}>
            {selectedCategory}
            <FontAwesomeIcon icon={faXmark} className="select-filter-icon" />
          </div>
        )}
      </div>

      <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />

      <FontAwesomeIcon
        icon={faRotateLeft}
        className="arrow-icon"
        onClick={() => handleResetFilters()}
      />
    </div>
  );
};

export default Filters;
