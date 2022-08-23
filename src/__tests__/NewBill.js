/**
 * @jest-environment jsdom
 */

// import { screen } from "@testing-library/dom"
// import NewBillUI from "../views/NewBillUI.js"
// import NewBill from "../containers/NewBill.js"


// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then ...", () => {
//       const html = NewBillUI()
//       document.body.innerHTML = html
//       //to-do write assertion
//       const formulaire = screen.getByTestId('form-new-bill')
//       expect(formulaire).not.toBeNull()
//       expect(formulaire).not.toBeUndefined()
//       const envoiFormulaire = jest.fn(formulaire.handleSubmit)
//       formulaire.addEventListener('submit',envoiFormulaire)
//       expect(envoiFormulaire).toHaveBeenCalled()
      
//       const file = screen.getByTestId(`file`)
//       const changementFichier = jest.fn(file.handleChangeFile)
//       file.addEventListener("change", changementFichier)
//       expect(changementFichier).toHaveBeenCalled()
//     })
//   })
// })
