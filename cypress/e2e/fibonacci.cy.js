import {BASE_URL} from "../../src/constants/url";

const mockData = [ '1', '1', '2', '3', '5', '8', '13', '21' ]

describe('Testing fibonacci page', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}fibonacci`)
    cy.get('[data-testid="input"]').as("input")
    cy.get('[data-testid="button"]').as("button")
  })

  it('if input is empty, button disabled', () => {
    cy.get('@input').clear()
    cy.get('@button').should('be.disabled')
  })

  it('fibonacci algorithm works correctly', () => {
    cy.get('@input').type('7')
    cy.get("@button").click()
    cy.get('[class^=circle_circle]').each((number, index) => {
      expect(number).to.have.text(mockData[index])
    })
  })
})
