import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filters from '../components/Filters';

test('renders Filters component', () => {
  render(<Filters filter="" setFilter={() => {}} />);

  expect(screen.getByText('Extract Data')).toBeInTheDocument();
  expect(screen.getByText('Monitoring')).toBeInTheDocument();
  expect(screen.getByText('Filter By Site')).toBeInTheDocument();
  expect(screen.getByText('Filter By Category')).toBeInTheDocument();
});

test('clicking on Filter By Site toggles dropdown visibility', () => {
  render(<Filters filter="" setFilter={() => {}} />);

  const filterBySiteButton = screen.getByText('Filter By Site');
  expect(screen.queryByText('ProductHunt')).not.toBeInTheDocument();

  fireEvent.click(filterBySiteButton);
  expect(screen.getByText('ProductHunt')).toBeInTheDocument();

  fireEvent.click(filterBySiteButton);
  expect(screen.queryByText('ProductHunt')).not.toBeInTheDocument();
});
