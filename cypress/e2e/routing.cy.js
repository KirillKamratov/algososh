describe("Testing page routing", function () {
  beforeEach(()=>{
    cy.visit('/')
  })

  it("should open main page as default", () => {
    cy.contains("МБОУ АЛГОСОШ")
  });

  it("should open string page after clicking on a string icon", () => {
    cy.get('a[href*="/recursion"]').click()
    cy.contains("Строка")
  });

  it('should open fibonacci page after clicking on a fibonacci icon',() => {
    cy.get('a[href*="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  })

  it('should open sorting page after clicking on a sorting icon', () => {
    cy.get('a[href*="/sorting"]').click()
    cy.contains('Сортировка массива')
  })

  it('should open stack page after clicking on a stack icon', () => {
    cy.get('a[href*="/stack"]').click()
    cy.contains('Стек')
  })

  it('should open queue page after clicking on queue icon', () => {
    cy.get('a[href*="/queue"]').click()
    cy.contains('Очередь')
  })

  it('should open list page after clicking on a list icon', () => {
    cy.get('a[href*="list"]').click()
    cy.contains('Связный список')
  })
});
