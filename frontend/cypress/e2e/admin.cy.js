
it("login", () => {
  cy.visit("../../admin/pageAdmin.html")

  cy.get("button[id=ButtonLogin]").click()

  //Login
  cy.get("input[id=LoginEmail]").type("greg@g")
  cy.get("input[id=LoginPassword]").type("greg")
  cy.get("button").contains("Login").click()

  //Admin page
  cy.get("button[id=ButtonAdmin]").click()

  cy.get("button").contains("Account").click()
  cy.get("button").contains("Logout").click()
})



it("new data", () => {
  cy.visit("../../admin/pageAdmin.html")

  //Login
  cy.get("button[id=ButtonLogin]").click()
  cy.get("input[id=LoginEmail]").type("greg@g")
  cy.get("input[id=LoginPassword]").type("greg")
  cy.get("button").contains("Login").click()
  cy.get("button[id=ButtonAdmin]").click()


  
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

    //Login
    cy.get("button[id=ButtonLogin]").click()
    cy.get("input[id=LoginEmail]").type("greg@g")
    cy.get("input[id=LoginPassword]").type("greg")
    cy.get("button").contains("Login").click()
    cy.get("button[id=ButtonAdmin]").click()
  


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

    //Login
    cy.get("button[id=ButtonLogin]").click()
    cy.get("input[id=LoginEmail]").type("greg@g")
    cy.get("input[id=LoginPassword]").type("greg")
    cy.get("button").contains("Login").click()
    cy.get("button[id=ButtonAdmin]").click()
  
  cy.get("td").contains("Enemies").click()

  cy.get("td[id=DeleteEnemy-7]").click()

  cy.get("button").contains("Yes").click()

})














it("invalid login", () => {
  cy.visit("../../admin/pageAdmin.html")
  cy.get("button[id=ButtonLogin]")

  //blank
  cy.get("button").contains("Login").click()
  cy.get("button").contains("Continue").click({force:true})

  //incorrect
  cy.get("input[id=LoginEmail]").type("hdhdh")
  cy.get("input[id=LoginPassword]").type("grdg")
  cy.get("button").contains("Login").click()
  cy.get("button").contains("Continue").click({force:true})

  //blank
  cy.get("input[id=LoginEmail]").type("hdhdh")
  cy.get("input[id=LoginPassword]").type("grdg")

})