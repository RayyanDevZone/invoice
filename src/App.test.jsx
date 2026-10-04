import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the BillEase navbar', () => {
  render(<App />);
  const navbarHeading = screen.getByRole('heading', { name: /BillEase/i });
  expect(navbarHeading).toBeInTheDocument();
});
