import {DELAY_IN_MS} from "../../src/constants/delays";

import { colors } from "../../src/constants/styles";
import {BASE_URL} from "../../src/constants/url";


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
  })

  it('if input is empty, button disabled', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  })

})
