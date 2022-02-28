import { mount } from "@cypress/react"; // or @cypress/vue
import { Button } from "@components/Common/Button";

describe("SearchInput", () => {
  it("renders the search", () => {
    mount(<Button>Test</Button>);
    cy.get("input[type='button']").should("exist");
  });
});
