import { invalidPattern, invalidMin } from './utils.js'

function Validator(form, selector = 'validator', options = {}) {

  // Use of data selectors to update errors
  const config = {
    errorAttr: `data-${selector}-error-id`,
  }
  const inputs = [...form.querySelectorAll(`[${config.errorAttr}]`)]
  const onChange = options.onChange
  const onValidSubmit = options.onValidSubmit
  let submitTriggered = false

  // Disable native form validation
  form.setAttribute('novalidate', true)

  // define html attribute names for validation
  const ATTR = {
    REQUIRED: 'required',
    PATTERN: 'pattern',
    MIN: 'min',
    MAX: 'max',
    MAX_LENGTH: 'max-length',
  }

  const getErrorElementByType = (el, type) => {
    const id = el.getAttribute(config.errorAttr)
    const container = document.getElementById(id)

    return container.querySelector(`[data-${selector}-error="${type}"]`)
  }

  const validate = (el) => {

    // Check if each rule is set and validate
    const value = el.value
    const type = el.type

    // Get validation rules from element
    const isRequired = el.hasAttribute(ATTR.REQUIRED)
    const pattern = el.getAttribute(ATTR.PATTERN)
    const min = el.getAttribute(ATTR.MIN)
    const max = el.getAttribute(ATTR.MAX)
    const maxLength = el.getAttribute(ATTR.MAX_LENGTH)

    if (isRequired && !value) {
      // Validate required field
      return getErrorElementByType(el, ATTR.REQUIRED)
    } else if (pattern && invalidPattern(value, pattern)) {
      // Validate pattern
      return getErrorElementByType(el, ATTR.PATTERN)
    } else if (min && invalidMin(value, min, type)) {
      // Validate minimum value
      return getErrorElementByType(el, ATTR.MIN)
    } else if (max && invalidMax(value, max, type)) {
      // Validate maximum value
      return getErrorElementByType(el, ATTR.MAX)
    }
  }

  const isFormValid = () => {
    // Get all form errors
    const errorCount = inputs.reduce((errors, input) => {
      const error = validate(input)

      return error || errors
    }, [])

    return errorCount.length === 0
  }

  const updateErrors = (input) => {
    const id = input.getAttribute(config.errorAttr)
    const errorContainer = document.getElementById(id)

    // Hide all (existing) error messages
    const errors = [
      ...errorContainer.querySelectorAll(`[data-${selector}-error]`),
    ]

    errors.forEach((error) => {
      error.hidden = true
      input.setAttribute('aria-invalid', false)
    })

    const error = validate(input)

    if (error) {
      // Show error
      error.hidden = false
      input.setAttribute('aria-invalid', 'true')
    }
  }

  const handleOnChange = (event) => {
    const input = event.target
    if (submitTriggered) {
      updateErrors(input)
    }

    // invoke callback function
    if (onChange) {
      onChange(input)
    }
  }

  const handleOnSubmit = (event) => {
    // Prevent native form submission
    event.preventDefault()

    // Update submit triggered status
    submitTriggered = true

    // Update errors
    inputs.forEach((input) => updateErrors(input))

    // Submit if form has no errors
    if (isFormValid()) {
      onValidSubmit ? onValidSubmit() : form.submit()
    }
  }

  // Bind to events
  form.addEventListener('submit', handleOnSubmit)
  inputs.forEach((input) => input.addEventListener('input', handleOnChange))
}

export default Validator