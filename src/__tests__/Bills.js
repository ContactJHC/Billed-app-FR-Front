/**
 * @jest-environment jsdom
 */

import {screen, waitFor} from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js"
import mockStore from "../__mocks__/store"
jest.mock("../app/store", () => mockStore)

// import {fireEvent, screen, waitFor} from "@testing-library/dom"
// import userEvent from '@testing-library/user-event'
// import DashboardFormUI from "../views/DashboardFormUI.js"
// import DashboardUI from "../views/DashboardUI.js"
// import Dashboard, { filteredBills, cards } from "../containers/Dashboard.js"
// import { ROUTES, ROUTES_PATH } from "../constants/routes"
// import { localStorageMock } from "../__mocks__/localStorage.js"
// import mockStore from "../__mocks__/store"
// import { bills } from "../fixtures/bills"
// import router from "../app/Router"

import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      expect(windowIcon.getAttribute('class')).toContain("active-icon")
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    test('Then each eye-icon should handle "handleClickIconEye" function ', () => {}
    )
  })
})

describe('Given I am connected as an Employee', () => {
  describe('When I click on the icon eye of a bill line description', () => {
    test('Then a modal should open', async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('tbody'))

      //On vérifie qu'il n'y a pas d'élément ayant 'justificatif' comme valeur de l'attribut data-testid
      expect(screen.queryByTestId("justificatif")).toBeNull();
      const eyes = screen.getAllByTestId('icon-eye')
      const eye = eyes[0]

      //La fonction 'handleClickIconEye' doit être prise de l'élément 'eye' lui même
      const handleClickIconEye = jest.fn(eye.handleClickIconEye)
      eye.addEventListener('click', handleClickIconEye)
      userEvent.click(eye)
      expect(handleClickIconEye).toHaveBeenCalled()

      //après avoir cliqué l'élément ayant 'justificatif' comme valeur de l'attribut data-testid doit apparaitre
      const justificatif = screen.getByTestId('justificatif')
      expect(justificatif).not.toBeNull()
      expect(justificatif).not.toBeUndefined()
    })
  })
})

// describe('Given I am connected as an Employee', () => {
//   describe('When the URL switched to .../#employee/bills', () => {
//     test('Then URL should switch to .../#employee/bills', async () => {
//       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({
//         type: 'Employee'
//       }))
//       const root = document.createElement("div")
//       root.setAttribute("id", "root")
//       document.body.append(root)
//       router()
//       window.onNavigate(ROUTES_PATH.Bills)
//       await waitFor(() => screen.getByTestId('btn-new-bill'))
//       const bouton = screen.getByTestId('btn-new-bill')
//       const handleClickBouton = jest.fn(bouton.handleClickNewBill)
//       bouton.addEventListener('click', handleClickBouton)
//       userEvent.click(bouton)
//       expect(handleClickBouton).toHaveBeenCalled()

//     })
//   })
// })

// test intégration GET sur bill container
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Dashboard", () => {
    test("fetches bills from mock API GET", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: 'employee@test.tld'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId("tbody"))
      const iconeUne = await screen.getAllByTestId('icon-window')
      const iconeUneMarche = iconeUne[0]
      expect(iconeUneMarche).toBeTruthy()
      const iconeDeux = await screen.getByText('Mes notes de frais')
      expect(iconeDeux).toBeTruthy()
      const boutonx = await screen.getByTestId('btn-new-bill')
      expect(boutonx).toBeTruthy()
    })
  // describe("When an error occurs on API", () => {
  //   beforeEach(() => {
  //     jest.spyOn(mockStore, "bills")
  //     Object.defineProperty(
  //         window,
  //         'localStorage',
  //         { value: localStorageMock }
  //     )
  //     window.localStorage.setItem('user', JSON.stringify({
  //       type: 'Employee'
  //     }))
  //     const root = document.createElement("div")
  //     root.setAttribute("id", "root")
  //     document.body.appendChild(root)
  //     router()
  //   })
  //   test("fetches bills from an API and fails with 404 message error", async () => {

  //     mockStore.bills.mockImplementationOnce(() => {
  //       return {
  //         list : () =>  {
  //           return Promise.reject(new Error("Erreur 404"))
  //         }
  //       }})
  //     window.onNavigate(ROUTES_PATH.Bills)
  //     await new Promise(process.nextTick);
  //     const message = await screen.getByText(/Erreur 404/)
  //     expect(message).toBeTruthy()
  //   })

  //   test("fetches messages from an API and fails with 500 message error", async () => {

  //     mockStore.bills.mockImplementationOnce(() => {
  //       return {
  //         list : () =>  {
  //           return Promise.reject(new Error("Erreur 500"))
  //         }
  //       }})

  //     window.onNavigate(ROUTES_PATH.bills)
  //     await new Promise(process.nextTick);
  //     const message = await screen.getByText(/Erreur 500/)
  //     expect(message).toBeTruthy()
  //   })
  // })

  })
})