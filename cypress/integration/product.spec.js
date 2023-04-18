describe("Product page", () => {
  it("fetches product with handle RTX 3090", () => {
    cy.visit("/products/RTX-3090")

    cy.get("h3").contains("Nvidia RTX 3090")
  })

  it("adds a product to the cart", () => {
    cy.visit("/products/RTX-3090")

    cy.get("button") // Select the button element
      .contains("Add to cart") // Filter by buttons that contain the text "Add to cart"
      .click()

    cy.get("button").contains("My Bag (1)")
  })

  it("adds a product twice to the cart", () => {
    cy.visit("/products/RTX-3090")

    cy.get("button") // Select the button element
      .contains("Add to cart") // Filter by buttons that contain the text "Add to cart"
      .click()
    cy.get("button") // Select the button element
      .contains("Add to cart") // Filter by buttons that contain the text "Add to cart"
      .click()

    cy.get("button").contains("My Bag (2)")
  })
})
