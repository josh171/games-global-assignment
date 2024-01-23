import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterList from '../components/FilterList';

const mockSites = ['Google', 'Amazon', 'LinkedIn'];

test('clicking on "Filter By Site" shows the site dropdown', () => {
  render(
    <FilterList
      filters={{ extract: '', monitoring: '', filterBySite: [], filterByCategory: '' }}
      setFilters={() => {}}
      sites={mockSites}
      selectedSiteOptions={[]}
      setSelectedSiteOptions={() => {}}
      filtersContainerRef={null}
      siteDropdownRef={null}
      categoryDropdownRef={null}
      showSiteOptions={false}
      setShowSiteOptions={() => {}}
      showCategoryOptions={false}
      setShowCategoryOptions={() => {}}
      selectedCategory=""
      setSelectedCategory={() => {}}
    />
  );

  fireEvent.click(screen.getByText('Filter By Site'));

  expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  expect(screen.getByText('Google')).toBeInTheDocument();
  expect(screen.getByText('Amazon')).toBeInTheDocument();
  expect(screen.getByText('LinkedIn')).toBeInTheDocument();
});
