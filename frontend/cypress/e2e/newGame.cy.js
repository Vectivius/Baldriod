

it("new game random attributes", () => {
  cy.visit("../../newGame/pageNewGame.html")

  //Easy
  cy.get("td[id=SettingsOptionEasy]").click()
  cy.get("div[id=NewGameDifficulty]").invoke('hide')

  //Name
  cy.get("textarea[id=NewGamePlayerName]").type("Cypress")

  cy.get("div[id=NewGameAttributes]").invoke('hide')

  //Generate attributes
  cy.get("button[id=ButtonGenerate]").click()

  //Start game
  cy.get("button[id=ButtonStartGame]").click()

  cy.getAllLocalStorage({log: true})

  //Player not empty
  cy.get("th[id=PlayerName]").should('not.be.empty')

  cy.get("td[id=PlayerStartAttack]").should('not.be.empty')
  cy.get("td[id=PlayerStartDefense]").should('not.be.empty')
  cy.get("td[id=PlayerStartHp]").should('not.be.empty')
  cy.get("td[id=PlayerStartMagic").should('not.be.empty')

  cy.get("td[id=PlayerCurrentAttack]").should('not.be.empty')
  cy.get("td[id=PlayerCurrentDefense]").should('not.be.empty')
  cy.get("td[id=PlayerCurrentHp]").should('not.be.empty')
  cy.get("td[id=PlayerCurrentMagic").should('not.be.empty')

})


it("new game selected attributes", () => {
  cy.visit("../../newGame/pageNewGame.html")

  //Easy
  cy.get("td[id=SettingsOptionEasy]").click()
  cy.get("div[id=NewGameDifficulty]").invoke('hide')

  //Name
  cy.get("textarea[id=NewGamePlayerName]").type("Cypress")[0]

  //Attributes
  cy.get("td[id=SettingsOptionSelect]").click()
  cy.get("div[id=NewGameAttributes]").invoke('hide')

  //cy.get("input[id=SetAmount]").clear()
  //cy.get("input[id=SetAmount]").type("8", {force: true})
  //cy.get("input[id=SetAmount]").value="8" // invoke('html', '<input type="number" id="SetAmount" value="8" min="1" max="52" oninput="this.value = Math.abs(this.value)>')

  cy.get("td[id=attPlus1]").click({force:true})
  cy.get("td[id=attPlus2]").click({force:true})
  cy.get("td[id=attPlus3]").click({force:true})
  cy.get("td[id=attPlus3]").click({force:true})
  cy.get("td[id=attPlus4]").click({force:true})
  //cy.get("td").should("have.class", "setAttributePlus")


  //Start game
  cy.get("button[id=ButtonStartGame]").click()

  cy.getAllLocalStorage({log: true})
})