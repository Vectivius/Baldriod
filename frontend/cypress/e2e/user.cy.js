it("user blank login", () => {
  cy.visit("../../registerAndLogin/pageLogin.html")
  cy.get("button[id=ButtonLogin]").click()
})


it("user incorrect login", () => {
  cy.visit("../../registerAndLogin/pageLogin.html")
  cy.get("input[id=LoginEmail]").type("ohfghfe@o")
  cy.get("input[id=LoginPassword]").type("gfd")
  cy.get("button[id=ButtonLogin]").click()

})



it("user register", () => {
  cy.visit("../../registerAndLogin/pageRegister.html")

  cy.get("input[id=RegName]").type("new")
  cy.get("input[id=RegEmail]").type("new@n")
  cy.get("input[id=RegPassword]").type("new")
  cy.get("button").contains("Register").click()

  cy.get("button").contains("Account").click()
})

it("blank register", () => {
  cy.visit("../../home/pageHome.html")
  cy.get("button[id=ButtonReg]").click()
  cy.get("button").contains("Register").click()
})



it("user login", () => {
  cy.visit("../../registerAndLogin/pageLogin.html")

  cy.get("input[id=LoginEmail]").type("one@o")
  cy.get("input[id=LoginPassword]").type("one")
  cy.get("button").contains("Login").click()

  cy.get("button").contains("Saved games").click()
  // cy.get("td").contains("Rename").click()

  // cy.get("input[id=NewSaveName]").type("n3")
  // cy.get("button[id=CypressSaveNewSaveName]").click()

})

//at least one save required
it("user rename and load save", () => {
  cy.visit("../../registerAndLogin/pageLogin.html")

  cy.get("input[id=LoginEmail]").type("one@o")
  cy.get("input[id=LoginPassword]").type("one")
  cy.get("button").contains("Login").click()

  cy.get("button").contains("Saved games").click()
  cy.get("td").contains("Rename").click()

  cy.get("input[id=NewSaveName]").type("n3")
  cy.get("button[id=CypressSaveNewSaveName]").click()

    //Load
    cy.get("td").contains("Load").click()
})




it("user edit account", () => {
  cy.visit("../../registerAndLogin/pageRegister.html")

  cy.get("button[id=ButtonReg]").click()
  cy.get("button").contains("Continue").click()

  cy.get("input[id=RegName]").type("newn")
  cy.get("input[id=RegEmail]").type("new@nn")
  cy.get("input[id=RegPassword]").type("newn")
  cy.get("button").contains("Register").click()

  cy.get("button").contains("Account").click()
 // cy.get("input[id=UserName]").should('contain', 'new')
 // cy.get("input[id=UserEmail]").should('contain', 'new@n')

  cy.get("button").contains("Edit account").click()

  cy.get("input[id=EditName]").type("n")
  cy.get("input[id=EditEmail]").type("n")
  cy.get("input[id=EditPassword]").type("n")

  cy.get("button[id=CypressSaveAccount]").click()
  cy.get("button").contains("Continue").click({force:true})
  cy.get("button[id=CypressSaveBack]").click()

  //cy.get("button").contains("Back").click()
  cy.get("button").contains("Account").click()
})