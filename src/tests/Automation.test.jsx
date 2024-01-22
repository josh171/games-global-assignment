import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Automation from '../components/Automation';

test('renders Automation component correctly', () => {
  const automation = {
    slug: 'example-slug',
    sites: [{ logoSmall2x: 'path/to/logo.png', title: 'Example Site' }],
    title: 'Example Title',
    shortDescription: 'Example Description'
  };

  const setFilterMock = jest.fn();

  render(<Automation automation={automation} setFilter={setFilterMock} />);

  expect(screen.getByAltText(/Img Title: Example Site/i)).toBeInTheDocument();
  expect(screen.getByText(/Example Title/i)).toBeInTheDocument();
  expect(screen.getByText(/Example Description/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Example Title/i));
  expect(setFilterMock).toHaveBeenCalledWith('example');
});
