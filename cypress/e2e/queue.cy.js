import { BASE_URL } from "../../src/constants/url";
import { borderColors } from "../../src/constants/styles";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const mockData = [
  [
    { value: "t", color: borderColors.changing },
  ],
  [
    { value: "t", color: borderColors.changing },
    { value: "e", color: borderColors.default },
  ],
  [
    { value: "t", color: borderColors.changing },
    { value: "e", color: borderColors.default },
    { value: "s", color: borderColors.default },
  ],
  [
    { value: "t", color: borderColors.changing },
    { value: "e", color: borderColors.default },
    { value: "s", color: borderColors.default },
    { value: "t", color: borderColors.default },
  ],
]

const clearingMockData = ['1', '2', '3']

describe('Testing queue page', () => {
  before(() => {
    cy.visit(`${BASE_URL}queue`)
  })

  beforeEach(() => {
    cy.get('[data-testid="inputField"]').as("input")
    cy.get('[data-testid="addButton"]').as("addButton")
    cy.get('[data-testid="deleteButton"]').as("deleteButton")
    cy.get('[data-testid="clearButton"]').as("clearButton")
  })

  it('if input is empty, button disabled', () => {
    cy.get('@input').clear()
    cy.get('@addButton').should('be.disabled')
  })

  it('adding items to queue works correctly', () => {
    mockData.forEach((item, index) => {
      cy.get('@input').type(item[index].value)
      cy.get('@addButton').click()
      cy.get('[class^=circle_circle]').eq(index)
        .should('have.css', 'border-color', borderColors.changing)
        .contains(item[index].value)
      cy.get('[class^=circle_circle]').prev().should('have.text', 'head')
      cy.get('[class^=circle_circle]').eq(index).next().next().should('have.text', 'tail')
    })
    cy.wait(SHORT_DELAY_IN_MS)
  })

  it('deleting items from queue works correctly', () => {
    mockData.forEach((item, index) => {
      cy.get("@deleteButton").click()
      cy.get('[class^=circle_circle]').eq(index)
        .should('not.have.text')
      cy.get('[class^=circle_circle]').eq(index).prev()
        .should('have.text', 'head')
    })
    cy.wait(SHORT_DELAY_IN_MS)
  })

  it('queue clearing works correctly', () => {
    clearingMockData.forEach(item => {
      cy.get("@input").type(item)
      cy.get("@addButton").should("not.be.disabled")
      cy.get("@addButton").click()
      cy.wait(SHORT_DELAY_IN_MS)
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('@clearButton').click()
    cy.get('[class^=circle_circle]').each((element) => {
      expect(element).to.have.text('')
    })
  })
})
