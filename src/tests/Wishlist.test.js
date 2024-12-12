import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Wishlist from "../components/Wishlist";

// Mock-Daten
const mockWishlist = [
  {
    id: 1,
    title: "Trip 1",
    description: "Description 1",
    startTrip: new Date(2023, 5, 1),
    endTrip: new Date(2023, 5, 10),
  },
  {
    id: 2,
    title: "Trip 2",
    description: "Description 2",
    startTrip: new Date(2023, 6, 15),
    endTrip: new Date(2023, 6, 20),
  },
];

// Mock-Funktionen
const mockRemoveFromWishlist = jest.fn();
const mockClearWishlist = jest.fn();

test("renders wishlist with items", () => {
    render(
      <Wishlist
        wishlist={mockWishlist}
        removeFromWishlist={mockRemoveFromWishlist}
        clearWishlist={mockClearWishlist}
      />
    );
  
    // Überprüfen der Anzahl der gerenderten <tr> Elemente innerhalb des <tbody>
    const rows = screen.getAllByRole('row');
    
    // Wir erwarten zwei <tr> Elemente für die beiden Trips in der Wunschliste
    expect(rows).toHaveLength(4); // Zwei Items plus Header Row
  
    // Spezifischere Auswahl durch Rolle oder Test-ID
    const firstTripTitle = screen.getByRole('heading', { name: /Trip 1/ });
    
    expect(firstTripTitle).toBeInTheDocument();
  });

test("calls removeFromWishlist when delete button is clicked", () => {
  render(
    <Wishlist
      wishlist={mockWishlist}
      removeFromWishlist={mockRemoveFromWishlist}
      clearWishlist={mockClearWishlist}
    />
  );

  // Klicke auf den "delete Item"-Button für den ersten Trip
  const deleteButtons = screen.getAllByText(/delete Item/);
  
  fireEvent.click(deleteButtons[0]);

  // Überprüfen, ob die Funktion `removeFromWishlist` mit dem richtigen Item aufgerufen wurde
  expect(mockRemoveFromWishlist).toHaveBeenCalledWith(mockWishlist[0]);
});

test("calls clearWishlist when empty wishlist button is clicked", () => {
  render(
    <Wishlist
      wishlist={mockWishlist}
      removeFromWishlist={mockRemoveFromWishlist}
      clearWishlist={mockClearWishlist}
    />
  );

  // Klicke auf den "empty wishlist"-Button
  fireEvent.click(screen.getByText(/empty wishlist/));

  // Überprüfen, ob die Funktion `clearWishlist` aufgerufen wurde
  expect(mockClearWishlist).toHaveBeenCalled();
});
