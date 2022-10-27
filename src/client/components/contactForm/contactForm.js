import Validator from "../../js/validator/validator.js";
import { getDateFormat } from "../../js/validator/utils.js";
import renderFormElements from "./customerElements.js";

window.onload = () => {
  const form = document.getElementById('contactForm');
  renderFormElements(form)
  const selector = form.dataset.formType

  const sanitizeForm = (body) => {
    const isSendNews = document.getElementById('isSendNews').checked;
    const state = document.getElementById("state").value;

    body['isSendNews'] = isSendNews
    body['state'] = state

    if (body['dateOfBirth']) {
      body['dateOfBirth'] = getDateFormat({ date: body['dateOfBirth'] })
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
    hideAlert(null, 'error')

    // Show spinner while request is completed
    showSpinner()

    // If at least one checkbox is selected do fetch
    fetch(path, options)
      .then(errorHandler)
      .then(checkData)
      .then(hideSpinner)
      .catch(showErrorMessage)
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
      showAlert('Customer Created Successfully', 'success')
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
    showAlert(data, 'error')
    hideSpinner()
  }

  const showAlert = (data, type) => {
    const alert = document.getElementById(`${selector}-${type}-alert`)
    alert.innerHTML = data
    alert.classList.remove('hidden')
    alert.classList.add('block')
  }

  const hideAlert = (data, type) => {
    const alert = document.getElementById(`${selector}-${type}-alert`)
    alert.innerHTML = data
    alert.classList.remove('block')
    alert.classList.add('hidden')
  }

  new Validator(form, selector, {
    onChange: handleOnChange,
    onValidSubmit: handleOnSubmit,
  });
};
