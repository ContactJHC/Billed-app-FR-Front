/**
 * @jest-environment jsdom
 */

 import {screen, waitFor} from "@testing-library/dom"
 import userEvent from '@testing-library/user-event'
 import { ROUTES_PATH} from "../constants/routes.js";
import router from "../app/Router.js";

import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js"
// import mockStore from "../__mocks__/store"
// jest.mock("../app/store", () => mockStore)


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then I can upload a file and submit it", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByTestId('file'))
    // CI-DESSOUS : esquisse donnée comme commencement par OC
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      const formulaire = screen.getByTestId('form-new-bill')
      expect(formulaire).not.toBeNull()
      expect(formulaire).not.toBeUndefined()
      let typeDeDepense = screen.getByText('Type de dépense')
      expect(typeDeDepense).not.toBeNull()
      expect(typeDeDepense).not.toBeUndefined()
      const boutonEnvoyer = screen.getByText('Envoyer')
      const envoiFormulaire = jest.fn(formulaire.handleSubmit)
      formulaire.addEventListener('submit',envoiFormulaire)
      userEvent.click(boutonEnvoyer)
      expect(envoiFormulaire).toHaveBeenCalled()
      expect(typeDeDepense).not.toBeNull()
      expect(typeDeDepense).not.toBeUndefined()
      const file = screen.getByTestId(`file`)
      const changementFichier = jest.fn(file.handleChangeFile)
      file.addEventListener("click", changementFichier)
      userEvent.click(file)
      expect(changementFichier).toHaveBeenCalled()
      // userEvent.type()
      const champDate = screen.getByTestId('datepicker')
      champDate.value = '01/09/2022'
      const champMontant = screen.getByTestId('amount')
      champMontant.value = '95'
      const champTVA = screen.getByTestId('pct')
      champTVA.value = '20'
      // const champFichier = screen.getByTestId('file')
      // champFichier.value = "fichier.jpg"
      userEvent.click(boutonEnvoyer)
      typeDeDepense = screen.getByText('Type de dépense')
      expect(envoiFormulaire).toHaveBeenCalled()
      expect(typeDeDepense).toBeNull()
      expect(typeDeDepense).toBeUndefined()
    })
  })
})

// petite fonction qui marche bien en l'état à récupérer au cas où problème lors de l'intégration 
// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then I can upload a file and submit it", async () => {
//       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({
//         type: 'Employee'
//       }))
//       const root = document.createElement("div")
//       root.setAttribute("id", "root")
//       document.body.append(root)
//       router()
//       window.onNavigate(ROUTES_PATH.NewBill)
//       await waitFor(() => screen.getByTestId('file'))
//     // CI-DESSOUS : esquisse donnée comme commencement par OC
//       const html = NewBillUI()
//       document.body.innerHTML = html
//       //to-do write assertion
//       const formulaire = screen.getByTestId('form-new-bill')
//       expect(formulaire).not.toBeNull()
//       expect(formulaire).not.toBeUndefined()
//       const boutonEnvoyer = screen.getByText('Envoyer')
//       const envoiFormulaire = jest.fn(formulaire.handleSubmit)
//       formulaire.addEventListener('submit',envoiFormulaire)
//       userEvent.click(boutonEnvoyer)
//       expect(envoiFormulaire).toHaveBeenCalled()
      
//       const file = screen.getByTestId(`file`)
//       const changementFichier = jest.fn(file.handleChangeFile)
//       file.addEventListener("click", changementFichier)
//       userEvent.click(file)
//       expect(changementFichier).toHaveBeenCalled()
//       userEvent.type()
//     })
//   })
// })
