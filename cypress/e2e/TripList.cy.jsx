
describe('TripList E2E Tests', () => {
    beforeEach(() => {
      // Besuche die Seite mit der TripList-Komponente
      cy.visit('/'); // Die Base URL wird aus der cypress.config.js verwendet
    });
  
    it('displays all trips by default', () => {
      // Überprüfe, ob alle Trips angezeigt werden
      cy.get('.card.card-product').should('have.length', 3); // Annahme: Es gibt drei Trips in testTrips
      cy.contains('Triplist-Catalog').should('exist');
    });
  
    it('filters trips by month', () => {
      // Filtere nach Februar (Monat = "2")
      cy.get('#month').select('2'); // Monat auswählen
      cy.contains('Found 1 trip for the month of Feb').should('exist');
      cy.get('.card.card-product').should(
        'have.length',
        1 // Es gibt nur einen Trip im Februar in den Testdaten
      );
  
      // Filtere nach einem Monat ohne Ergebnisse (z. B. Januar)
      cy.get('#month').select('1'); // Monat auswählen
      cy.contains('Productlist is empty').should('exist');
      cy.get('.card.card-product').should('not.exist');
    });
  
    it('adds a trip to the wishlist when the button is clicked', () => {
        const stub = cy.stub();
        
        // Fange mögliche Alerts oder andere Fenster ab
        cy.on('window:alert', stub);
    
        // Klicke auf den Button "Add to Wishlist" für den ersten Trip
        cy.get('.btn.btn-link.btn-outline').first().click();
    
      });
  });
  