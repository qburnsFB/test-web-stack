import { aliasQuery } from "../utils/graphql-test-utils";
/*
it("should display modal when clicked", () => {
  cy.visit("http://localhost:3000");
  cy.get("#__next").should("be.visible");
  cy.get(".UsersList").within(() => {
    cy.findAllByRole("listitem").first().click({ force: true });
    cy.findByRole("dialog").should("be.visible");
  });
}); */

context("given that each user displays modal when clicked", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#__next").should("be.visible");
    cy.findAllByRole("listitem").first().click({ force: true });
    cy.findByRole("dialog").should("be.visible");
  });

  it("should close when canceled", () => {
    cy.findByRole("dialog").within(() => {
      cy.findAllByRole("button")
        .last()
        .click()
        .then(() => {
          cy.findAllByRole("dialog").should("not.exist");
        });
    });
  });

  it("should update mapbox when address changed", () => {
    // Bit unconvential here, but intercepting fetch doesn't work with Cypress yet
    // So inside our mapbox component, we update the data-testid with the latest successful search
    cy.findByRole("dialog").within(() => {
      cy.get(`input[name="address"]`).clear().type("90210");
      cy.findByTestId("modal-address-90210");
    });
  });

  it("should show an error when submitted with an empty input", () => {
    cy.findByRole("dialog").within(() => {
      cy.findAllByRole("textbox").first().clear();
      cy.findAllByRole("button").first().click();
      cy.findByText("All fields are required.");
    });
  });

  it("should submit and close the modal and update the user in place", () => {
    const randomDescription = `Cypress tested: ${Math.random()
      .toString(36)
      .substr(2, 20)}`;
    cy.findByRole("dialog").within(() => {
      cy.get("input[name='description']").clear().type(randomDescription);
      cy.findAllByRole("button")
        .first()
        .click()
        .then(() => {
          cy.findAllByRole("button").first().should("be.disabled");
          cy.findAllByRole("dialog").should("not.exist");
        });
    });

    cy.findByText(randomDescription);
  });
});
