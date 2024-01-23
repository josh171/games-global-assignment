import { faPlus, faRightLeft, faTv, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const FilterList = ({
  filters,
  setFilters,
  sites,
  selectedSiteOptions,
  setSelectedSiteOptions,
  filtersContainerRef,
  siteDropdownRef,
  categoryDropdownRef,
  showSiteOptions,
  setShowSiteOptions,
  showCategoryOptions,
  setShowCategoryOptions,
  selectedCategory,
  setSelectedCategory
}) => {
  const [filterSiteSearch, setFilterSiteSearch] = useState('');

  // Function to handle setting the filter values
  const handleSiteOptionClick = (option) => {
    if (selectedSiteOptions.includes(option)) {
      setSelectedSiteOptions((prevOptions) =>
        prevOptions.filter((siteOption) => siteOption !== option)
      );
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterBySite: prevFilters.filterBySite.filter((siteOption) => siteOption !== option)
      }));
    } else {
      setSelectedSiteOptions((prevOptions) => [...prevOptions, option]);
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterBySite: [...prevFilters.filterBySite, option]
      }));
    }
  };
  return (
    <div className="filters" ref={filtersContainerRef}>
      <div
        className={`filter ${filters.extract === 'scrape' && 'selected'}`}
        onClick={() =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            extract: prevFilters.extract === 'scrape' ? '' : 'scrape'
          }))
        }>
        <FontAwesomeIcon icon={faRightLeft} className="extract-icon fa-icon" /> Extract Data
      </div>

      <div
        className={`filter ${filters.monitoring === 'monitor' && 'selected'}`}
        onClick={() =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            monitoring: prevFilters.monitoring === 'monitor' ? '' : 'monitor'
          }))
        }>
        <FontAwesomeIcon icon={faTv} className="fa-icon" /> Monitoring
      </div>

      <div className="filter-dropdown">
        <div className="filter" onClick={() => setShowSiteOptions(!showSiteOptions)}>
          <FontAwesomeIcon icon={faPlus} className="fa-icon" /> Filter By Site
        </div>
        <div
          ref={siteDropdownRef}
          className={`dropdown dropdown-sites ${showSiteOptions && 'show'}`}>
          <input
            type="text"
            placeholder="Search"
            className="filter-search-input"
            value={filterSiteSearch}
            onChange={(e) => setFilterSiteSearch(e.target.value)}
          />

          {sites
            .filter((site) => site.toLowerCase().includes(filterSiteSearch.toLowerCase()))
            .map((option) => {
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
      </div>

      {selectedSiteOptions.map((option) => (
        <div className="filter selected" key={option} onClick={() => handleSiteOptionClick(option)}>
          {option}
          <FontAwesomeIcon icon={faXmark} className="select-filter-icon" />
        </div>
      ))}

      <div className="filter-dropdown">
        <div className="filter" onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
          <FontAwesomeIcon icon={faPlus} className="fa-icon" /> Filter By Category
        </div>
        <div ref={categoryDropdownRef} className={`dropdown ${showCategoryOptions && 'show'}`}>
          {['SEO', 'Competitive Intelligence'].map((category) => (
            <div
              key={category}
              className={`dropdown-option ${selectedCategory === category && 'selected'}`}
              onClick={() => {
                setSelectedCategory(category);
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  filterByCategory: category
                }));
              }}>
              <span className="text">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div
          className="filter selected"
          onClick={() => {
            setSelectedCategory('');
            setFilters((prevFilters) => ({
              ...prevFilters,
              filterByCategory: ''
            }));
          }}>
          {selectedCategory}
          <FontAwesomeIcon icon={faXmark} className="select-filter-icon" />
        </div>
      )}
    </div>
  );
};

export default FilterList;
