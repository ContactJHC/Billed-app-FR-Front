/**
 * @jest-environment jsdom
 */

import {screen, waitFor} from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";

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
      // document.body.innerHTML = BillsUI({ data: bills })
      await waitFor(() => screen.getByTestId('tbody'))
      $.fn.modal = jest.fn()
      const rowsOfBills = screen.getByTestId('tbody')
      const handleClickIconEye = jest.fn(rowsOfBills.handleClickIconEye)
      const eyes = screen.getAllByTestId('icon-eye')
      const eye = eyes[0]
      eye.addEventListener('click', handleClickIconEye)
      userEvent.click(eye)
      expect(handleClickIconEye).toHaveBeenCalled()
      await waitFor(() => {
        const modale = screen.getByRole('document')
        expect(modale).not.toBeNull()
        expect(modale).not.toBeUndefined()

      })
    })
  })
})

describe('Given I am connected as an Employee', () => {
  describe('When I click on the "new bill" button', () => {
    test('Then URL should switch to .../#employee/bill/new', async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('btn-new-bill'))
      const bouton = screen.getByTestId('btn-new-bill')
      const handleClickBouton = jest.fn(bouton.handleClickNewBill)
      bouton.addEventListener('click', handleClickBouton)
      userEvent.click(bouton)
      expect(handleClickBouton).toHaveBeenCalled()

    })
  })
})