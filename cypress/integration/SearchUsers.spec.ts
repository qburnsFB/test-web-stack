it("should properly filter users", () => {
  cy.visit("http://localhost:3000");
  cy.get("#__next").should("be.visible");

  cy.findByTestId("UsersList").within(() => {
    // Wait for users
    cy.findAllByRole("listitem").should("have.length.above", 0);

    // Search "Fan" since our test users contain multiple users with Fan in their name
    cy.findByRole("searchbox").type("Fan");
    cy.findByTestId("searchInputIsSearching").should("not.be.visible");
    cy.findAllByRole("listitem").contains("Fan");

    // Reset and confirm all users show again
    cy.findByRole("searchbox").clear();
    cy.findByTestId("searchInputIsSearching").should("not.be.visible");
    cy.findAllByRole("listitem").contains("Tom");
  });
});
