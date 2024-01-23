import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Automation from '../components/Automation';

const mockAutomation = {
  id: 1,
  slug: 'example-slug-1',
  sites: [{ logoSmall2x: 'path/to/logo.png', title: 'Google' }],
  title: 'Google Title',
  shortDescription: 'This is a google description'
};

test('renders Automation component correctly', () => {
  const { getByAltText, getByText } = render(<Automation automation={mockAutomation} />);

  expect(getByAltText(/Img Title: Google/i)).toBeInTheDocument();
  expect(getByText(/Google Title/i)).toBeInTheDocument();
  expect(getByText(/This is a google description/i)).toBeInTheDocument();
});
