import { BASE_URL } from "../../src/constants/url";
import { colors } from "../../src/constants/styles";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const mockData = [
  [{ value: "t", color: colors.changing }],
  [
    { value: "t", color: colors.default },
    { value: "e", color: colors.changing },
  ],
  [
    { value: "t", color: colors.default },
    { value: "e", color: colors.default },
    { value: "s", color: colors.changing },
  ],
  [
    { value: "t", color: colors.default },
    { value: "e", color: colors.default },
    { value: "s", color: colors.default },
    { value: "t", color: colors.changing },
  ],
];

const reversedMockData = [...mockData].reverse();

describe('Testing stack page', () => {
  before(() => {
    cy.visit(`${BASE_URL}stack`)
  })

  beforeEach(() => {
    cy.get('[data-testid="input"]').as("input")
    cy.get('[data-testid="addButton"]').as("addButton")
    cy.get('[data-testid="deleteButton"]').as("deleteButton")
    cy.get('[data-testid="clearButton"]').as("clearButton")
  })

  it('if input is empty, button disabled', () => {
    cy.get('@input').clear()
    cy.get('@addButton').should('be.disabled')
  })

  it('pushing items to stack works correctly', () => {
    mockData.forEach((stack, index) => {
      cy.get("@input").type(stack[index].value);
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();
      cy.get("div[class^='circle_circle']")
        .should("have.length", index + 1)
        .each((item, key) => {
          const {value, color} = stack[key];
          expect(item).to.have.text(value);
          expect(item).to.have.css("border-color", color);
        });
      cy.wait(SHORT_DELAY_IN_MS);
    })
  })

  it("deleting items from stack works correctly", () => {
    reversedMockData.forEach((stack, index) => {
      cy.get("@deleteButton").click();
      cy.get("div[class^='circle_circle']")
        .should("have.length", reversedMockData.length - index)
        .each((item, key) => {
          const { value, color } = stack[key];
          expect(item).to.have.text(value);
          expect(item).to.have.css("border-color", color);
        });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it('stack clearing works correctly', () => {
    mockData.forEach((stack, index) => {
      cy.get("@input").type(stack[index].value);
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();
    })
    cy.get('@clearButton').click()
    mockData.forEach(() => {
      cy.get('[class^=circle_content]').should('have.length', '0');
    })
  })
})
