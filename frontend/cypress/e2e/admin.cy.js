it("correct admin login", () => {
  cy.visit("../../registerAndLogin/pageLogin.html")

  cy.get("input[id=LoginEmail]").type("greg@g")
  cy.get("input[id=LoginPassword]").type("greg")
  cy.get("button").contains("Login").click()

  cy.get("button").contains("Admin page").click()
  cy.get("button").contains("Account").click()
  // cy.get("button").contains("Logout").click()

})


it("new data", () => {
  //Login
  cy.visit("../../registerAndLogin/pageLogin.html")
  cy.get("input[id=LoginEmail]").type("greg@g")
  cy.get("input[id=LoginPassword]").type("greg")
  cy.get("button").contains("Login").click()
  cy.get("button").contains("Admin page").click()

  cy.get("button[id=ButtonNewData]").click()
  cy.get("button[id=ButtonNewDataEnemy]").click()

  cy.get("td").contains("Enemies").click()


  //Write data
  cy.get("input[id=NewDataEnemyName]").type("cypr")
  cy.get("button[id=SaveNewDataEnemy]").click()
  cy.get("td").contains("Enemies").click()

  cy.get("td").contains("cypr")
})







//6 enemy needed
it("edit data", () => {
    //Login
    cy.visit("../../registerAndLogin/pageLogin.html")
    cy.get("input[id=LoginEmail]").type("greg@g")
    cy.get("input[id=LoginPassword]").type("greg")
    cy.get("button").contains("Login").click()
    cy.get("button").contains("Admin page").click()

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
    //Login
    cy.visit("../../registerAndLogin/pageLogin.html")
    cy.get("input[id=LoginEmail]").type("greg@g")
    cy.get("input[id=LoginPassword]").type("greg")
    cy.get("button").contains("Login").click()
    cy.get("button").contains("Admin page").click()
    
  cy.get("td").contains("Enemies").click()

  cy.get("td[id=DeleteEnemy-7]").click()

  cy.get("button").contains("Yes").click()

})







