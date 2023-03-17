import { borderColors } from "../../src/constants/styles"
import { BASE_URL } from "../../src/constants/url"
import {DELAY_IN_MS} from "../../src/constants/delays"


const mockData = [
  [
    { value: "t", color: borderColors.changing },
    { value: "e", color: borderColors.default },
    { value: "s", color: borderColors.default },
    { value: "t", color: borderColors.changing },
  ],
  [
    { value: "t", color: borderColors.modified },
    { value: "e", color: borderColors.changing },
    { value: "s", color: borderColors.changing },
    { value: "t", color: borderColors.modified },
  ],
  [
    { value: "t", color: borderColors.modified },
    { value: "s", color: borderColors.modified },
    { value: "e", color: borderColors.modified },
    { value: "t", color: borderColors.modified },
  ],
]

describe('Testing string page', () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}recursion`)
    cy.get('[data-testid="input"]').as("input")
    cy.get('[data-testid="button"]').as("button")
  })

  it('if input is empty, button disabled', () => {
    cy.get('@input').clear()
    cy.get('@button').should('be.disabled')
  })

  it('reverse algorithm works correctly', () => {
    cy.get("@input").type("test")
    cy.get("@button").click()
    mockData.forEach(item => {
      cy.get('[class^="circle_circle"]').each((letter, index) => {
        expect(letter).to.have.text(item[index].value)
        expect(letter).to.have.css('border-color', item[index].color)
      })
      cy.wait(DELAY_IN_MS)
    })
  })

})
