import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Wishlist from '../components/Wishlist'; // Pfad zur Wishlist-Komponente

describe('Wishlist Component', () => {
  const mockRemoveFromWishlist = jest.fn();
  const mockClearWishlist = jest.fn();
  
  const sampleWishlist = [
    { id: 1, title: 'Trip to Paris', description: 'A lovely trip to Paris', startTrip: new Date(), endTrip: new Date() },
    { id: 2, title: 'Trip to New York', description: 'An exciting trip to New York', startTrip: new Date(), endTrip: new Date() }
  ];

  test('renders wishlist items correctly', () => {
    render(<Wishlist wishlist={sampleWishlist} removeFromWishlist={mockRemoveFromWishlist} clearWishlist={mockClearWishlist} />);
    
    const parisElements = screen.getAllByText('Trip to Paris');
    expect(parisElements.length).toBeGreaterThan(0);
  });

  test('displays empty message when wishlist is empty', () => {
    render(<Wishlist wishlist={[]} removeFromWishlist={mockRemoveFromWishlist} clearWishlist={mockClearWishlist} />);
    
    expect(screen.getByText('Wishlist is empty')).toBeInTheDocument();
  });

  test('calls clearWishlist when "empty wishlist" button is clicked', () => {
    render(<Wishlist wishlist={sampleWishlist} removeFromWishlist={mockRemoveFromWishlist} clearWishlist={mockClearWishlist} />);
    
    fireEvent.click(screen.getByText('empty wishlist'));
    expect(mockClearWishlist).toHaveBeenCalledTimes(1);
  });
});