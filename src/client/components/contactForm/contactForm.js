import Validator from "../../js/validator/validator.js";
import renderFormElements from "./customerElements.js";

window.onload = () => {
  const form = document.getElementById('contactForm');
  renderFormElements(form)
  const selector = form.dataset.formType

  const sanitizeForm = (body) => {
    if (body['dateOfBirth']) {
      // @TODO Change format to DoB
      body['dateOfBirth'] = '09-20-1969'
    }

    delete body["confirmPassword"];

    return body
  }

  const handleOnChange = () => {
  }

  const handleOnSubmit = () => {
    const formData = new FormData(form);
    const formVlaues = Object.fromEntries(formData);
    const body = sanitizeForm(formVlaues)

    // Get action path to make request
    const path = form.getAttribute('action')

    // update submit triggered status
    // submitTriggered = true

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    // Hide alert while request is completed
    hideAlert()

    // Show spinner while request is completed
    showSpinner()

    // If at least one checkbox is selected do fetch
    fetch(path, options)
      .then(errorHandler)
      .then(checkData)
      .then(hideSpinner)
      .catch(showErrorMessage)

    window.location.href = '../welcomePage/welcome.html';
  }

  const errorHandler = (response) => {
    switch (response.status) {
      case 200:
      case 201:
        return response.json()

      case 401:
      default:
        throw new Error(response.status)
    }
  }

  const checkData = (data) => {
    if (data && !data.error) {
      console.log('User Created successfully');
    } else if (data && data.error) {
      showErrorMessage(data.error.message)
    }
  }

  const showSpinner = () => {
    const spinner = document.getElementById(`${selector}-spinner`) // Get spinner element
    spinner.classList.remove('hidden') // Remove CSS block class
    spinner.classList.add('block') // Add CSS block class
  }

  const hideSpinner = () => {
    const spinner = document.getElementById(`${selector}-spinner`)
    spinner.classList.remove('block')
    spinner.classList.add('hidden')
  }

  const showErrorMessage = (data) => {
    showAlert(data)
    hideSpinner()
  }

  const showAlert = (data) => {
    const alert = document.getElementById(`${selector}-alert`)
    alert.innerHTML = data
    alert.classList.remove('hidden')
    alert.classList.add('block')
  }

  const hideAlert = (data) => {
    const alert = document.getElementById(`${selector}-alert`)
    alert.innerHTML = data
    alert.classList.remove('block')
    alert.classList.add('hidden')
  }

  new Validator(form, selector, {
    onChange: handleOnChange,
    onValidSubmit: handleOnSubmit,
  });
};
