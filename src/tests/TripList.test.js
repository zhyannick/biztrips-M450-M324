import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TripList from '../components/TripList'; // Pfad zur TripList-Komponente
import { testTrips } from '../components/api';

jest.mock('../components/api', () => ({
  testTrips: [
    { id: 1, title: 'Trip to Paris', description: 'A lovely trip to Paris', startTrip: [2024, 1], endTrip: [2024, 2] },
    { id: 2, title: 'Trip to New York', description: 'An exciting trip to New York', startTrip: [2024, 3], endTrip: [2024, 4] }
  ]
}));

describe('TripList Component', () => {
  const mockAddToWishlist = jest.fn();

  test('renders trip items correctly', () => {
    render(<TripList addToWishlist={mockAddToWishlist} />);
    
    expect(screen.getByText('Trip to Paris')).toBeInTheDocument();
    expect(screen.getByText('Trip to New York')).toBeInTheDocument();
  });

  test('displays empty message when no trips are available', () => {
    jest.mock('./api', () => ({
      testTrips: []
    }));
    
    render(<TripList addToWishlist={mockAddToWishlist} />);
    
    expect(screen.getByText('Productlist is empty')).toBeInTheDocument();
  });

  test('filters trips by month correctly', () => {
    render(<TripList addToWishlist={mockAddToWishlist} />);
    
    fireEvent.change(screen.getByLabelText(/Filter by Month/i), { target: { value: '1' } });
    expect(screen.getByText('Found 1 trip for the month of Jan')).toBeInTheDocument();
    
    fireEvent.change(screen.getByLabelText(/Filter by Month/i), { target: { value: '3' } });
    expect(screen.getByText('Found 1 trip for the month of March')).toBeInTheDocument();
  });

  test('calls addToWishlist when "Add to Wishlist" button is clicked', () => {
    render(<TripList addToWishlist={mockAddToWishlist} />);
    
    fireEvent.click(screen.getAllByText(/Add to Wishlist/i)[0]);
    expect(mockAddToWishlist).toHaveBeenCalledWith(testTrips[0]);
  });
});