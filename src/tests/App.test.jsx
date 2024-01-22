import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders App component correctly', () => {
  const mockAutomations = [
    {
      id: 1,
      slug: 'example-slug-1',
      sites: [{ logoSmall2x: 'path/to/logo.png', title: 'Example Site 1' }],
      title: 'Example Title 1',
      shortDescription: 'Example Description 1'
    },
    {
      id: 2,
      slug: 'example-slug-2',
      sites: [{ logoSmall2x: 'path/to/logo.png', title: 'Example Site 2' }],
      title: 'Example Title 2',
      shortDescription: 'Example Description 2'
    }
  ];

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      data: {
        oneClickAutomations: {
          items: mockAutomations
        }
      }
    })
  });

  render(<App />);

  return screen.findByText(/Example Title 1/i).then(() => {
    expect(screen.getByAltText(/Img Title: Example Site 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Example Title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Example Description 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Example Title 1/i));
    expect(screen.getByText(/No automations found/i)).not.toBeInTheDocument();
  });
});
