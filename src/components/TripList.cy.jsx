import React from 'react'
import TripList from './TripList'
import { testTrips } from './api';
import { render, screen } from '@testing-library/react';

describe('TripList Component', () => {
  beforeEach(() => {
      cy.mount(<TripList addToWishlist={cy.stub()} />);
  });

  it('renders all trips by default', () => {
      cy.get('.card.card-product').should('have.length', testTrips.length);
  });

  it('filters trips by month', () => {
      cy.get('#month').select('2'); // Februar auswählen
      cy.get('h2').contains('Found 1 trip for the month of Feb');
      cy.get('.card.card-product').should('have.length', 1);

      cy.get('#month').select('6'); // Juni auswählen
      cy.get('h2').contains('Found 1 trip for the month of June');
      cy.get('.card.card-product').should('have.length', 1);
  });

  it('displays an empty message when no trips match the filter', () => {
      cy.get('#month').select('1'); // Monat ohne Trips auswählen (Januar)
      cy.get('.alert.alert-info').contains('Productlist is empty').should('exist');
  });

  it('adds a trip to the wishlist when the button is clicked', () => {
    const addToWishlistStub = cy.stub();
  
    // Mount die Komponente mit dem Stub für addToWishlist
    cy.mount(<TripList addToWishlist={addToWishlistStub} />);
  
    // Stelle sicher, dass der Button existiert und sichtbar ist
    cy.get('.btn.btn-link.btn-outline').first().should('exist').and('be.visible');
  
    // Simuliere einen Klick auf den Button
    cy.get('.btn.btn-link.btn-outline').first().click();
  
    // Überprüfe den Stub-Aufruf
    cy.wrap(addToWishlistStub).should('have.been.calledOnce');
  
    // Optional: Überprüfe den Inhalt des Stub-Aufrufs
    cy.wrap(addToWishlistStub).then((stub) => {
      expect(stub.getCall(0).args[0]).to.deep.equal(testTrips[0]);
    });
  });
  
});

describe('TripList Integration Tests', () => {
  beforeEach(() => {
    cy.mount(<TripList addToWishlist={cy.stub()} />);
  });

  it('renders all trips by default', () => {
    // Überprüfe, ob alle Trips gerendert werden
    cy.get('.card.card-product').should('have.length', testTrips.length);
    cy.contains('Triplist-Catalog').should('exist');
  });

  it('calls addToWishlist when "Add to Wishlist" button is clicked', () => {
    const addToWishlistStub = cy.stub();

    // Mount die Komponente mit dem Stub für addToWishlist
    cy.mount(<TripList addToWishlist={addToWishlistStub} />);

    // Klicke auf den Button "Add to Wishlist" für den ersten Trip
    cy.get('.btn.btn-link.btn-outline').first().click();

    // Überprüfe, ob der Stub aufgerufen wurde
    cy.wrap(addToWishlistStub).should('have.been.calledOnce');
    
    // Überprüfe den Inhalt des Stub-Aufrufs
    cy.wrap(addToWishlistStub).then((stub) => {
      expect(stub.getCall(0).args[0]).to.deep.equal(testTrips[0]);
    });
  });
});

