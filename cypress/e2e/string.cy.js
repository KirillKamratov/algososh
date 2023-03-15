import { colors } from "../../src/constants/styles"
import { BASE_URL } from "../../src/constants/url"
import {DELAY_IN_MS} from "../../src/constants/delays"


const mockData = [
  [
    { value: "t", color: colors.changing },
    { value: "e", color: colors.default },
    { value: "s", color: colors.default },
    { value: "t", color: colors.changing },
  ],
  [
    { value: "t", color: colors.modified },
    { value: "e", color: colors.changing },
    { value: "s", color: colors.changing },
    { value: "t", color: colors.modified },
  ],
  [
    { value: "t", color: colors.modified },
    { value: "s", color: colors.modified },
    { value: "e", color: colors.modified },
    { value: "t", color: colors.modified },
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
