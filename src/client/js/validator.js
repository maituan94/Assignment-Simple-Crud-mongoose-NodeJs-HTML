function Validator(form, selector = 'validator', options = {}) {

  // use of data selectors to update errors
  const config = {
    errorAttr: `data-${selector}-error-id`,
  }
  const inputs = [...form.querySelectorAll(`[${config.errorAttr}]`)]
  const onChange = options.onChange
  const onValidSubmit = options.onValidSubmit

  // disable native form validation
  form.setAttribute('novalidate', true)

  const handleOnChange = (event) => {
    // update errors
    // invoke callback function
  }

  const handleOnSubmit = (event) => {
    // prevent native form submission
    event.preventDefault()

    // update submit triggered status
    // submit if form has no errors

    onValidSubmit ? onValidSubmit() : form.submit()
  }

  // bind to events
  form.addEventListener('submit', handleOnSubmit)
  inputs.forEach((input) => input.addEventListener('input', handleOnChange))
}

export default Validator