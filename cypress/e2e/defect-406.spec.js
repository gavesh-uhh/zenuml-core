/* eslint-disable no-undef */
import "cypress-plugin-snapshots/commands";
describe("Defect 406", function () {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 720);
  });

  it("Fragments under Creation", function () {
    cy.visit("http://127.0.0.1:8080/cy/defect-406-alt-under-creation.html");
    cy.get('[data-signature="m6"]', { timeout: 5000 }).should("be.visible");
    // This line is to make sure the privacy icon is loaded
    cy.get(".privacy>span>svg", { timeout: 5000 }).should("be.visible");
    cy.document().toMatchImageSnapshot({
      imageConfig: { threshold: 0.01 },
      capture: "viewport",
    });
  });
});
