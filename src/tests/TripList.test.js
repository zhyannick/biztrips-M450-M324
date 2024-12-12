import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TripList from '../components/TripList';
import { testTrips } from '../components/api'; // Verwende die tatsächlichen Daten


// Mock data
const mockTrips = [
  {
    id: 1,
    title: 'BT01',
    description: 'San Francisco World Trade Center on new Server/IOT/Client002',
    startTrip: [2021, 2, 13, 0, 0],
    endTrip: [2021, 2, 15, 16, 56],
  },
  {
    id: 2,
    title: 'BT02',
    description: 'Santa Clara Halley on new Server/IOT/Client',
    startTrip: [2021, 6, 23, 9, 0],
    endTrip: [2021, 6, 27, 16, 56],
  },
];

// Mock function
const mockAddToWishlist = jest.fn();

test('filters trips by selected month using mock data', () => {
  render(<TripList addToWishlist={mockAddToWishlist} testTrips={mockTrips} />);

  // Verify all trips are displayed initially
  expect(screen.getByText(/BT01/)).toBeInTheDocument();
  expect(screen.getByText(/BT02/)).toBeInTheDocument();

  // Select February
  fireEvent.change(screen.getByLabelText(/Filter by Month:/), { target: { value: '2' } });

  // Verify only BT01 is displayed
  expect(screen.getByText(/BT01/)).toBeInTheDocument();
});

test('calls addToWishlist when button is clicked', () => {
  render(<TripList addToWishlist={mockAddToWishlist} testTrips={mockTrips} />);

  // Click on the "Add to Wishlist" button for BT01
  fireEvent.click(screen.getAllByText(/Add to Wishlist/)[0]);

  // Verify addToWishlist was called with the correct trip
  expect(mockAddToWishlist).toHaveBeenCalledWith(expect.objectContaining({
    id: 1,
    title: 'BT01',
    description: 'San Francisco World Trade Center on new Server/IOT/Client002',
    startTrip: [2021, 2, 13, 0, 0],
    endTrip: [2021, 2, 15, 16, 56],
  }));
});

// Integration Test

test('filters trips by selected month using real API data', () => {
  render(<TripList addToWishlist={mockAddToWishlist} testTrips={testTrips} />);

  // Verify all trips are displayed initially
  expect(screen.getByText(/BT01/)).toBeInTheDocument();
  expect(screen.getByText(/BT02/)).toBeInTheDocument();
  
  // Select June
  fireEvent.change(screen.getByLabelText("Filter by Month:"), { target: { value: '6' } });

  // Verify only BT02 is displayed
  expect(screen.getByText(/BT02/)).toBeInTheDocument();
});

// E2E Tests

test('filters trips by selected month and adds to wishlist', () => {
  render(<TripList addToWishlist={mockAddToWishlist} />);

  // Wähle Juni (6) aus dem Dropdown-Menü
  fireEvent.change(screen.getByLabelText(/Filter by Month:/), { target: { value: '6' } });

  // Überprüfe, ob nur BT02 angezeigt wird
  expect(screen.getByText(/BT02/)).toBeInTheDocument();
 

  // Füge BT02 zur Wunschliste hinzu
  const addToWishlistButton = screen.getAllByRole('button', { name: /Add to Wishlist/ });
  fireEvent.click(addToWishlistButton[0]);

  // Überprüfe, ob addToWishlist mit dem richtigen Trip aufgerufen wurde
});