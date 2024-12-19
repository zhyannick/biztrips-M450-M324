import React from 'react'
import Wishlist from './Wishlist'


describe('Wishlist Component', () => {
  let mockRemoveFromWishlist;
  let mockClearWishlist;

  beforeEach(() => {
    // Stubs für jede Testausführung erstellen
    mockRemoveFromWishlist = cy.stub();
    mockClearWishlist = cy.stub();

    // Mount die Komponente mit den Stubs
    cy.mount(
      <Wishlist
        wishlist={[
          {
            id: 1,
            title: 'Trip to Paris',
            description: 'A lovely trip to Paris',
            startTrip: new Date(2024, 1, 15), // Februar
            endTrip: new Date(2024, 1, 20),
          },
          {
            id: 2,
            title: 'Trip to Rome',
            description: 'An amazing adventure in Rome',
            startTrip: new Date(2024, 5, 10), // Juni
            endTrip: new Date(2024, 5, 15),
          },
        ]}
        removeFromWishlist={mockRemoveFromWishlist}
        clearWishlist={mockClearWishlist}
      />
    );
  });

  it('renders the Wishlist component with items', () => {
    // Überprüfe, ob die Komponente korrekt gerendert wird
    cy.get('.container').should('exist');
    cy.get('h2.h4').contains('Wishlist');

    // Überprüfe, ob alle Items angezeigt werden
    cy.get('tbody tr').should('have.length', 2); // Es gibt zwei Einträge in der Wunschliste
  });

  it('displays an empty message when the wishlist is empty', () => {
    // Mount die Komponente mit einer leeren Wunschliste
    cy.mount(
      <Wishlist
        wishlist={[]} // Leere Wunschliste
        removeFromWishlist={mockRemoveFromWishlist}
        clearWishlist={mockClearWishlist}
      />
    );

    // Überprüfe die leere Nachricht
    cy.get('.alert.alert-info').contains('Wishlist is empty').should('exist');
    cy.get('tbody tr').should('have.length', 1); // Nur die leere Nachricht wird angezeigt
  });

  it('removes an item from the wishlist when the delete button is clicked', () => {
    // Klicke auf den "delete Item"-Button für das erste Item
    cy.get('.btn.btn-outline-danger').first().click();

    // Überprüfe, ob `removeFromWishlist` aufgerufen wurde
    cy.wrap(mockRemoveFromWishlist).should('have.been.calledOnce');
    cy.wrap(mockRemoveFromWishlist).then((stub) => {
      expect(stub.getCall(0).args[0]).to.deep.equal({
        id: 1,
        title: 'Trip to Paris',
        description: 'A lovely trip to Paris',
        startTrip: new Date(2024, 1, 15),
        endTrip: new Date(2024, 1, 20),
      });
    });
  });

  it('clears the wishlist when the "empty wishlist" button is clicked', () => {
    // Klicke auf den "empty wishlist"-Button im `tfoot`
    cy.get('tfoot .btn.btn-outline-danger.float-right').click();
  
    // Überprüfe, ob `clearWishlist` aufgerufen wurde
    cy.wrap(mockClearWishlist).should('have.been.calledOnce');
  });
  it('disables the "empty wishlist" button when the wishlist is empty', () => {
    // Mount die Komponente mit einer leeren Wunschliste
    cy.mount(
      <Wishlist
        wishlist={[]} // Leere Wunschliste
        removeFromWishlist={mockRemoveFromWishlist}
        clearWishlist={mockClearWishlist}
      />
    );

    // Überprüfe, ob der Button deaktiviert ist
    cy.get('.btn.btn-outline-danger.float-right').should('be.disabled');
  });
});