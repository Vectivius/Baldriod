/*it("new data", () => {
  cy.visit("../../admin/pageAdmin.html")
  cy.get("button[id=ButtonNewData]").click()
  cy.get("button[id=ButtonNewDataEnemy]").click()

  cy.get("td").contains("Enemies").click()


  //Write data
  cy.get("input[id=NewDataEnemyName]").type("cypr")
  cy.get("button[id=SaveNewDataEnemy]").click()
  //cy.get("button").contains("Save data")
  cy.get("td").contains("Enemies").click()
  //cy.get("div[id=DivTable]").invoke("show")

  cy.get("td").contains("cypr")
})







//6 enemy needed
it("edit data", () => {
  cy.visit("../../admin/pageAdmin.html")

  //Load table
  cy.get("td").contains("Enemies").click()

  //Edit
  cy.get("td[id=EditEnemy-7]").click()
  cy.get("span[id=TextEditType]").invoke('html', 'Name')
  cy.get("span[id=SpanEditType]").invoke("hide")
  cy.get("input[id=NewValue]").type("cypr2")
  cy.get("button[id=EditForCypress]").click()

  cy.get("td").contains("Enemies").click()

})









it("delete data", () => {
  cy.visit("../../admin/pageAdmin.html")
  cy.get("td").contains("Enemies").click()

  cy.get("td[id=DeleteEnemy-7]").click()

  cy.get("button").contains("Yes").click()

})






it("login", () => {
  cy.visit("../../admin/pageAdmin.html")

  cy.get("textarea[id=LoginEmail]").type("greg@g")
  cy.get("textarea[id=LoginPassword]").type("greg")
  cy.get("button").contains("Login").click()

  cy.get("button").contains("Logout").click()

})
*/






it("invalid login", () => {
  cy.visit("../../admin/pageAdmin.html")

  //blank
  cy.get("button").contains("Login").click()
  cy.get("button").contains("Continue").click()

  //incorrect
  cy.get("textarea[id=LoginEmail]").type("hdhdh")
  cy.get("textarea[id=LoginPassword]").type("grdg")
  cy.get("button").contains("Login").click()
  cy.get("button").contains("Continue").click()

  //blank
  cy.get("textarea[id=LoginEmail]").type("hdhdh")
  cy.get("textarea[id=LoginPassword]").type("grdg")

})