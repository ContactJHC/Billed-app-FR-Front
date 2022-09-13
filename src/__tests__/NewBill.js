/**
 * @jest-environment jsdom
 */

 import {fireEvent, screen, waitFor} from "@testing-library/dom"
 import userEvent from '@testing-library/user-event'
 import NewBillUI from "../views/NewBillUI.js"
 import NewBill from "../containers/NewBill.js";
 import { bills } from "../fixtures/bills.js"
 import { ROUTES_PATH, ROUTES} from "../constants/routes.js";
 import {localStorageMock} from "../__mocks__/localStorage.js"
 
 // Important pour ne pas avoir de problème avec fetch
 import mockStore from "../__mocks__/store"
 jest.mock("../app/store", () => mockStore)
 
 // Importer router à la fin
 import router from "../app/Router.js";


 describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("L_icone de courrier dans la disposition verticale doit etre mise en surbrillance", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.NewBill);
      await waitFor(() => screen.getByTestId("icon-mail"));
      const windowMail = screen.getByTestId("icon-mail");
      //Vérifie si icon-window existe
      expect(windowMail).toBeTruthy();
      //vérifie si il y a bien la class active-icon'
      expect(windowMail.classList).toContain('active-icon');
    });
  })
})
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
      document.body.innerHTML = NewBillUI();
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const newBill = new NewBill({
        document,
        onNavigate,
        mockStore,
        localStorage: window.localStorage,
      });



      // document.body.innerHTML = NewBillUI();
      // await waitFor(() => screen.getByTestId('file'))
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
      // const file = screen.getByTestId('file')
      // const changementFichier = jest.fn(file.handleChangeFile)
      // file.addEventListener("click", changementFichier)
      // userEvent.click(file)
      // expect(changementFichier).toHaveBeenCalled()
      const file = new File(["hello"], "hello.jpeg", { type: "image/jpeg" })
      // const champFichier = screen.getByTestId('file')
      // champFichier.value = file
      const inputFile = screen.getByTestId("file");

      const handleChangeFile = jest.fn(inputFile.handleChangeFile)
      inputFile.addEventListener("change", handleChangeFile);

      fireEvent.change(inputFile, { target: { files: [file] } });

      expect(handleChangeFile).toHaveBeenCalled()
      // vérif que test bien réels ci-dessous
      // expect(inputFile.files[0].type).toBe("document/pdf")
      // début du test pour champFichier
      // const champFichier = screen.getByTestId('file')
      // champFichier.value = new Blob([""], { type: "image/jpeg" })
      // champFichier.value["lastModifiedDate"] = "";
      // champFichier.value["name"] = "";
      // const fichier = 'justificatif.jpeg'
      // const fileList = {
      //   0: fichier,
      //   1: fichier,
      //   length: 2,
      //   item: () => fichier
      // }
      // expect(champFichier.value).not.toBeNull()
      // fin du test pour champFichier
      const nomDepense = screen.getByTestId('expense-name')
      nomDepense.value = 'vol Paris Londres'
      const vat = screen.getByTestId('vat')
      vat.value = '70'
      const commentaires = screen.getByTestId('commentary')
      commentaires.value = 'facture suite à voyage à Londres'
      const champDate = screen.getByTestId('datepicker')
      champDate.value = '01/09/2022'
      const champMontant = screen.getByTestId('amount')
      champMontant.value = '95'
      const champTVA = screen.getByTestId('pct')
      champTVA.value = '20'
      userEvent.click(boutonEnvoyer)
      typeDeDepense = screen.getByText('Type de dépense')
      expect(envoiFormulaire).toHaveBeenCalled()
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
// userEvent.type()

