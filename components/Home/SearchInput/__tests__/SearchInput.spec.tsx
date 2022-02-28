import { mount } from "@cypress/react"; // or @cypress/vue
import { Button } from "@components/Common/Button";

it("Button", () => {
  mount(<Button>Test button</Button>);
  cy.get("button").contains("Test button").click();
});
