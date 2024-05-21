//npx cypress open










it("enemy not empty", () => {
  cy.visit("../../play/pagePlay.html")
  cy.get("button[id=ButtonNewRoundCypress]").click({force: true})
  cy.get("button[id=ButtonNewRoundCypress]").click({force: true})

  cy.get("th[id=EnemyName]").should('not.be.empty')
  cy.get("td[id=EnemyAttack]").should('not.be.empty')
  cy.get("td[id=EnemyDefense]").should('not.be.empty')
  cy.get("td[id=EnemyHp]").should('not.be.empty')
  cy.get("td[id=EnemyDamage").should('not.be.empty')
  cy.get("td[id=EnemyArmor").should('not.be.empty')
  cy.get("td[id=EnemyMagic").should('not.be.empty')
})











it("shop not empty", () => {
  cy.visit("../../play/pagePlay.html")
  cy.get("button[id=ButtonTown]").click()
  cy.get("button[id=ButtonTown]").click()
  cy.get("button[id=ButtonTown]").click()

  cy.get("button[id=ButtonReloadShop]").should("be.visible")

  cy.get("td[id=BuyWeapon1]").should('not.be.empty')
  cy.get("td[id=BuyArmor1]").should('not.be.empty')
  cy.get("td[id=BuyScroll1]").should('not.be.empty')
  cy.get("td[id=BuyItem1]").should('not.be.empty')

  cy.get("button[id=ButtonTown]").click()
})













it("buy items", () => {
  cy.visit("../../play/pagePlay.html")
  cy.get("button[id=ButtonTown]").click()
  cy.get("button[id=ButtonTown]").click()
  cy.get("button[id=ButtonTown]").click()

  //Buy weapon, no first
  cy.get("td[id=BuyWeapon1]").click()
  cy.get("button[id=MessageButtonNo]").click()

  cy.get("td[id=BuyWeapon1]").click()
  cy.get("button[id=MessageButtonYes]").click()

  cy.get("td[id=InventoryWeapon1]").should('not.be.empty')

  //Buy scroll
  cy.get("td[id=BuyScroll1]").click()
  cy.get("button[id=MessageButtonContinue]").click()

  cy.get("div[id=InventoryWeaponList]").invoke('hide')
  cy.get("div[id=InventoryArmorList]").invoke('hide')
  cy.get("div[id=InventoryShieldList]").invoke('hide')

  cy.get("span[id=InventoryCoins]").invoke('html', '<span>600</span>');
  cy.get("td[id=BuyScroll1]").click()
  cy.get("button[id=MessageButtonYes]").click()

  cy.get("td[id=InventoryItem1]").should('not.be.empty')


  //Buy other item
  cy.get("span[id=InventoryCoins]").invoke('html', '<span>600</span>');
  cy.get("td[id=BuyItem1]").click()
  cy.get("button[id=MessageButtonYes]").click()
  cy.get("td[id=InventoryItem2]").should('not.be.empty')
})











it("settings", () => {
  cy.visit("../../play/pagePlay.html")

  cy.get("div[id=DivSave]").invoke('hide')
  cy.get("div[id=DivLoad]").invoke('hide')

  cy.get("td[id=ButtonSettings]").click()

  cy.get("td[id=SettingsOptionHard]").click()
  cy.get("td[id=SettingsOptionNo]").click()

  cy.get("div[id=DivSettings]").invoke('hide')
})












it("use item", () => {
  cy.visit("../../newGame/pageNewGame.html")

  //Start game
  cy.get("div[id=NewGameAttributes]").invoke('hide')
  cy.get("button[id=ButtonGenerate]").click()
  cy.get("button[id=ButtonStartGame]").click()

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

    cy.get("div[id=DivSave]").invoke('hide')
    cy.get("div[id=DivLoad]").invoke('hide')
    cy.get("div[id=DivSettings]").invoke('hide')

    //Buy items
    cy.get("button[id=ButtonTown]").click()

    cy.get("span[id=InventoryCoins]").invoke('html', '<span>600</span>');

    cy.get("td[id=BuyItem1]").click()
    cy.get("button[id=MessageButtonYes]").click()

    cy.get("td[id=BuyScroll1]").click()
    cy.get("button[id=MessageButtonYes]").click()

    //Learn spell
    cy.get("td[id=InventoryItem2]").should('not.be.empty')
    cy.get("td[id=InventoryItem2Use]").click()
    cy.get("button[id=MessageButtonYes]").click()

    cy.get("td[id=InventoryItem2]").should('be.empty')
    cy.get("td[id=InventorySpell1]").should('not.be.empty')
    cy.get("td[id=InventorySpell1]").click()
    cy.get("span[id=InventoryChoosenSpell]").should('not.have.text','none')
    cy.get("span[id=InventoryChoosenSpell]").should('have.text','Fireball')

    //Sell spell
    cy.get("td[id=BuyScroll2]").click()
    cy.get("button[id=MessageButtonYes]").click()

    cy.get("td[id=InventoryItem2Sell]").click()
    cy.get("button[id=MessageButtonYes]").click()


    //Eat food
    cy.get("td[id=InventoryItem1Use]").click()
    cy.get("button[id=MessageButtonContinue]").click()

    cy.get("td[id=PlayerCurrentHp]").invoke('html', '<td>1</td>');
    cy.get("td[id=InventoryItem1Use]").click()
    cy.get("button[id=MessageButtonContinue]").click()

    //Buy and select armor
    cy.get("td[id=BuyArmor1]").click()
    cy.get("button[id=MessageButtonYes]").click()
    cy.get("td[id=InventoryArmor1]").click()

    cy.get("div[id=InventoryWeaponList]").invoke('hide')
    cy.get("span[id=InventorySelectedArmor]").should('not.have.text','none')

    let d1 = cy.get("td[id=PlayerCurrentDefense]", {log:true})

    cy.get("td[id=PlayerStartDefense]").should('not.contain', d1)


    //let d2 = cy.get("td[id=PlayerStartDefense]", {log:true})
    //d1.eq(d2-1)

})





it("save and load game", () => {
    //Start game
    cy.visit("../../newGame/pageNewGame.html")
    cy.get("td[id=SettingsOptionEasy]").click()
    cy.get("div[id=NewGameDifficulty]").invoke('hide')
    cy.get("textarea[id=NewGamePlayerName]").type("Cypress")
    cy.get("div[id=NewGameAttributes]").invoke('hide')
    cy.get("button[id=ButtonGenerate]").click()
    cy.get("button[id=ButtonStartGame]").click()

    //Hide menu
    cy.get("div[id=DivLoad]").invoke('hide')
    cy.get("div[id=DivSettings]").invoke('hide')
  
    //Player not empty
    cy.get("th[id=PlayerName]").should('contain', 'Cypress')

    //Save
    cy.get("input[id=SaveName]").type("Cypress", {force: true})
    cy.get("button").contains("Save").click()

    //Delete name
    cy.get("th[id=PlayerName]").invoke('html', '<td>600</td>');

    //Load
    // cy.get("div[id=DivSave]").invoke('hide')
    // cy.get("div[id=DivLoad]").invoke('show')
    // cy.get("input[id=LoadName]").type("Cypress")
    // cy.get("button").contains("Load").click()

    //Load at home page
    // cy.visit("../../home/pageHome.html")
    // cy.get("textarea[id=SaveName]").type("Cypress")
    // cy.get("button").contains("Load game").click()

    //Hide menu
    cy.get("div[id=DivLoad]").invoke('hide')
    cy.get("div[id=DivSave]").invoke('hide')
    cy.get("div[id=DivSettings]").invoke('hide')


})

