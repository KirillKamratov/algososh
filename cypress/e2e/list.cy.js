import { BASE_URL } from "../../src/constants/url";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import { borderColors, circleWidth } from "../../src/constants/styles";
import { HEAD, TAIL } from "../../src/constants/element-captions";

const mockData = [
  { value: "0", color: borderColors.default },
  { value: "34", color: borderColors.default },
  { value: "8", color: borderColors.default },
  { value: "1", color: borderColors.default },
]

const mockDataToAdd = '7'
const mockIndex = '1'


describe('Testing list page', () => {
  before(() => {
    cy.visit(`${BASE_URL}list`)
  })

  beforeEach(() => {
    cy.get('[data-testid="inputValue"]').as("inputValue")
    cy.get('[data-testid="addToHeadButton"]').as("addToHeadButton")
    cy.get('[data-testid="addToTailButton"]').as("addToTailButton")
    cy.get('[data-testid="removeFromHeadButton"]').as("removeFromHeadButton")
    cy.get('[data-testid="removeFromTailButton"]').as("removeFromTailButton")
    cy.get('[data-testid="inputIndex"]').as("inputIndex")
    cy.get('[data-testid="addByIndexButton"]').as("addByIndexButton")
    cy.get('[data-testid="removeByIndexButton"]').as("removeByIndexButton")
  })

  it('if inputValue is empty, adding buttons are disabled', () => {
    cy.get('@inputValue').clear()
    cy.get('@addToHeadButton').should('be.disabled')
    cy.get('@addToTailButton').should('be.disabled')
    cy.get('@addByIndexButton').should('be.disabled')
    cy.get('@removeByIndexButton').should('be.disabled')
  })

  it('if inputIndex is empty, removing by index button is disabled', () => {
    cy.get('@inputIndex').clear()
    cy.get('@removeByIndexButton').should('be.disabled')
  })

  it('default list renders correctly', () => {
      cy.get('[class^=circle_circle]').each((element, index) => {
        expect(element).to.have.text(mockData[index].value)
        expect(element).to.have.css('border-color', mockData[index].color)
        if (index === 0) {
          cy.get('[class^=circle_circle]').prev().should('have.text', HEAD)
        }
        if (index === mockData.length - 1) {
          cy.get('[class^=circle_circle]').next().next().should('have.text', TAIL)
        }
      })
  })

  it('adding to head works correctly', () => {
    cy.get('@inputValue').type(mockDataToAdd)
    cy.get('@addToHeadButton').click()
    cy.get('[class^=circle_circle]').first()
      .should('have.text', mockDataToAdd)
      .and('have.css', 'border-color', borderColors.changing)
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('[class^=circle_circle]').prev().should('have.text', HEAD)
      cy.get('[class^=circle_circle]').first()
      .should('have.css', 'border-color', borderColors.default)
  })

  it('adding to tail works correctly', () => {
    cy.get('@inputValue').type(mockDataToAdd)
    cy.get('@addToTailButton').click()
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('[class^=circle_circle]').last()
      .should('have.text', mockDataToAdd)
      .and('have.css', 'border-color', borderColors.default)
    cy.get('[class^=circle_circle]').last().next().next().should('have.text', TAIL)
  })

  it('adding by index works correctly', () => {
    cy.get('@inputIndex').type(mockIndex)
    cy.get('@inputValue').type(mockDataToAdd)
    cy.get("@addByIndexButton").click()
    cy.get("div[class^='circle_circle']")
      .first()
      .should((circle) => {
        expect(circle).to.have.text(mockDataToAdd)
        expect(circle).to.have.css("border-color", borderColors.changing)
        expect(circle).to.have.css("width", circleWidth.small)
      })
    cy.wait(SHORT_DELAY_IN_MS)

    cy.get("div[class^='circle_circle']")
      .eq(1)
      .should((circle) => {
        expect(circle).to.have.text(mockDataToAdd)
        expect(circle).to.have.css("border-color", borderColors.changing)
        expect(circle).to.have.css("width", circleWidth.small)
      })
    cy.wait(SHORT_DELAY_IN_MS)
  })

  it('removing from head works correctly', () => {
    cy.get('@removeFromHeadButton').click()
    cy.get('[class^=circle_circle]').first().should('not.have.text')
    cy.wait(DELAY_IN_MS)
    cy.get('[class^=circle_circle]').first()
      .should('have.css', 'border-color', borderColors.default)
      .and('not.be.empty')
    cy.get('[class^=circle_circle]').first().prev().should('have.text', HEAD)
  })

  it('deleting from index works correctly', () => {
    cy.get('@removeFromTailButton').click()
    cy.get('[class^=circle_circle]').last().should('not.have.text')
    cy.wait(DELAY_IN_MS)
    cy.get('[class^=circle_circle]').last()
      .should('have.css', 'border-color', borderColors.default)
      .and('not.be.empty')
    cy.get('[class^=circle_circle]').last().next().next().should('have.text', 'tail')
  })

  it('deleting by index works correctly', () => {
    cy.get('@inputIndex').type('1')
    cy.get('@removeByIndexButton').click()
    cy.get('[class^=circle_circle]').eq(1).should('have.text', '34')
    cy.wait(DELAY_IN_MS)
    cy.get('[class^=circle_circle]').eq(1)
      .should('have.css', 'border-color', borderColors.default)
  })
})
