import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewBill {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.store = store
    const formNewBill = this.document.querySelector(`form[data-testid="form-new-bill"]`)
    formNewBill.addEventListener("submit", this.handleSubmit)
    const file = this.document.querySelector(`input[data-testid="file"]`)
    file.addEventListener("change", this.handleChangeFile)
    this.fileUrl = null
    this.fileName = null
    this.billId = null
    new Logout({ document, localStorage, onNavigate })
  }
  handleChangeFile = e => {
    e.preventDefault()
    
    // rajout de handleSubmit
    const champFichier = this.document.querySelector('input[data-testid="file"]')
    const filePath = champFichier.files[0]
    // const filePathParts = filePath.split(/\\/g)
    // this.fileName = filePathParts[filePathParts.length-1]
    this.fileName = filePath.name
    const extensionsSupportees = ['.jpeg', '.jpg', '.png', '.gif']
    let isSupportedFile = false
    extensionsSupportees.forEach((e) => {
    if (this.fileName.endsWith(e)) {
      isSupportedFile = true
    }
    })
    const errorDiv = this.document.querySelector('#fileError')
    if (!isSupportedFile) {
      errorDiv.classList.remove('hidden')
      return false
    } else {
      errorDiv.classList.add('hidden')
    }
    // fin de rajout


    
    // fin de bug hunt bills
    const formData = new FormData()
    const email = JSON.parse(localStorage.getItem("user")).email
    formData.append('file', filePath)
    formData.append('email', email)

    this.store
      .bills()
      .create({
        data: formData,
        headers: {
          noContentType: true
        }
      })
      .then(({fileUrl, key}) => {
        console.log(fileUrl)
        this.billId = key
        this.fileUrl = fileUrl
      }).catch(error => console.error(error))
  }
  handleSubmit = e => {
    e.preventDefault()
    const cibleDepense = e.target.querySelector(`input[data-testid="expense-name"]`).value
    if (cibleDepense === '') {
      return false
    }
    const cibleVat = e.target.querySelector('input[data-testid="vat"]').value
    if (cibleVat === '') {
      return false
    }
    const cibleCommentary = e.target.querySelector(`textarea[data-testid="commentary"]`).value
    if (cibleCommentary === '') {
      return false
    }

    const elementDate = e.target.querySelector('input[data-testid="datepicker"]')
    const cibleDate = elementDate.value
    console.log('e.target.querySelector(`input[data-testid="datepicker"]`).value', e.target.querySelector(`input[data-testid="datepicker"]`).value)

    if (cibleDate === '') {
      return false
    }
    const cibleAmount = e.target.querySelector('input[data-testid="amount"]').value
    if (cibleAmount === '') {
      return false
    }
    const ciblePCT = e.target.querySelector('input[data-testid="pct"]').value
    if (ciblePCT === '') {
      return false
    }
    const champFichier = this.document.querySelector('input[data-testid="file"]')
    const filePath = champFichier.files[0]
    // const filePathParts = filePath.split(/\\/g)
    // this.fileName = filePathParts[filePathParts.length-1]
    this.fileName = filePath.name
    const extensionsSupportees = ['.jpeg', '.jpg', '.png', '.gif']
    let isSupportedFile = false
    extensionsSupportees.forEach((e) => {
    if (this.fileName.endsWith(e)) {
      isSupportedFile = true
    }
    })
    const errorDiv = this.document.querySelector('#fileError')
    if (!isSupportedFile) {
      errorDiv.classList.remove('hidden')
      return false
    } else {
      errorDiv.classList.add('hidden')
    }
    console.log('e.target.querySelector(`input[data-testid="datepicker"]`).value', e.target.querySelector(`input[data-testid="datepicker"]`).value)
    console.log('e.target.querySelector(`select[data-testid="expense-type"]`).value', e.target.querySelector(`select[data-testid="expense-type"]`).value)
    console.log('e.target.querySelector(`input[data-testid="expense-name"]`).value', e.target.querySelector(`input[data-testid="expense-name"]`).value)
    console.log('e.target.querySelector(`input[data-testid="amount"]`).value', e.target.querySelector(`input[data-testid="amount"]`).value)
    console.log('e.target.querySelector(`input[data-testid="vat"]`).value', e.target.querySelector(`input[data-testid="vat"]`).value)
    console.log('e.target.querySelector(`input[data-testid="pct"]`).value', e.target.querySelector(`input[data-testid="pct"]`).value)
    console.log('e.target.querySelector(`textarea[data-testid="commentary"]`).value', e.target.querySelector(`textarea[data-testid="commentary"]`).value)
    const email = JSON.parse(localStorage.getItem("user")).email
    
    const bill = {
      email,
      type: e.target.querySelector(`select[data-testid="expense-type"]`).value,
      name:  e.target.querySelector(`input[data-testid="expense-name"]`).value,
      amount: parseInt(e.target.querySelector(`input[data-testid="amount"]`).value),
      date:  e.target.querySelector(`input[data-testid="datepicker"]`).value,
      vat: e.target.querySelector(`input[data-testid="vat"]`).value,
      pct: parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) || 20,
      commentary: e.target.querySelector(`textarea[data-testid="commentary"]`).value,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      status: 'pending'
    }
    
    this.updateBill(bill)
    this.onNavigate(ROUTES_PATH['Bills'])
  }

  // not need to cover this function by tests
  updateBill = (bill) => {
    if (this.store) {
      this.store
      .bills()
      .update({data: JSON.stringify(bill), selector: this.billId})
      .then(() => {
        this.onNavigate(ROUTES_PATH['Bills'])
      })
      .catch(error => console.error(error))
    }
  }
}