 /**
   * It takes a component object as an argument and returns a string of HTML that renders a form input
   * @param component - The component object
   */
  export const renderInput = (component) => `<!-- Create ${component.label} input --> <div class="bg-white px-4 mb-6">
  <div class="form-control">
    <label for="${component.id}" class="mb-1 block text-sm font-medium text-gray-700">
      ${component.label}
    </label>
    <input
      id="${component.id}" 
      type="${component.type}" 
      name="${component.id}"
      class="mb-1 w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      placeholder="${component.placeholder}"
      pattern="${component.pattern}"
      required=${component.isRequired}
      ${component.min && `min=${component.min}`}
      data-contact-form-error-id="${component.idError}" />
    <div 
      id="${component.idError}"
      class="text-red-500 d-flex flex-column"
    >
      ${renderErrorMessage(component.errorMessage)}
    </div>
  </div>
  </div>`
  
  /**
   * It takes a component object as an argument, and returns a string of HTML that contains a label and a
   * series of radio buttons
   * @param component - The component object
   */
  export const renderRadioComponent = (component) => `<!-- Create ${component.label} input --> <div class="bg-white px-4 mb-6">
  <div class="form-control ${component.id}">
    <label for="${component.id}" class="mb-1 block text-sm font-medium text-gray-700">
      ${component.label}
    </label>
    <div class="flex">
    ${renderRadioOptions(component.options, component.id)}
    </div>
  </div>
  </div>`
  
  /**
   * It takes an array of options and a name, and returns a string of HTML that contains a radio button
   * for each option
   * @param options - an array of options for the radio buttons
   * @param name - The name of the radio group
   * @returns A string of HTML that contains a radio button for each option in the options array.
   */
  export const renderRadioOptions = (options, name) => {
    if (!options || options.length === 0) return ''
    let html = ''
    options.forEach((opt, index) => {
      html += `
      <div class="form-check form-check-inline mr-4">
        <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
          type="radio"
          ${index === 0 && "checked"}
          name="${name}" 
          id="radio${opt}"
          value="${opt}">
        <label class="form-check-label inline-block text-gray-800" for="${opt}">${opt}</label>
      </div>
      `
    })
    return html
  }
  
  /**
   * It takes a component object as an argument and returns a string of HTML that renders a textarea
   * input
   * @param component - The component object
   */
  export const renderTexarea = (component) => `<!-- Create ${component.label} input --> <div class="bg-white px-4 mb-6">
  <div class="form-control">
    <label for="${component.id}" class="mb-1 block text-sm font-medium text-gray-700">
      ${component.label}
    </label>
    <textarea
      id="${component.id}" 
      name="${component.id}"
      class="mb-1 w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      placeholder="${component.placeholder}"
      required=${component.isRequired}
      ${component.rows && `rows="${component.rows}"`}
      ${component.min && `min=${component.min}`}
      data-contact-form-error-id="${component.idError}"></textarea>
    <div 
      id="${component.idError}"
      class="text-red-500 d-flex flex-column"
    >
      ${renderErrorMessage(component.errorMessage)}
    </div>
  </div>
  </div>`
  
  /**
   * It takes a component object as an argument and returns a string of HTML that represents a single
   * checkbox
   * @param component - The component object
   */
  export const renderSingleCheckbox = (component) => `<!-- Create ${component.label} input --> <div class="bg-white px-4 mb-6">
  <div class="form-control">
    <div class="form-check">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
        type="checkbox"
        id="${component.id}"
        >
      <label class="form-check-label inline-block text-gray-800" for="${component.label}">${component.label}</label>
    </div>
  </div>
  </div>`

/**
 * It takes a component object as an argument, and returns a string of HTML that contains a select
 * input
 * @param component - {
 */
  export const renderSelect = (component) => `
  <!-- Create ${component.label} input --> <div class="bg-white px-4 mb-6">
  <div class="form-control">
    <label for="${component.id}" class="mb-1 block text-sm font-medium text-gray-700">
      ${component.label}
    </label>
    <div class="form-check">
      <select id="${component.id}" class="form-select appearance-none
        block
        mb-1 w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        aria-label="Default select example">
          ${renderSelectOptions(component.options)}
      </select>
    </div>
  </div>
  </div>
  `
  
/**
 * It takes an object and returns a string of HTML options
 * @param options - an object of key/value pairs that will be used to populate the select options.
 * @returns The html variable is being returned.
 */
  const renderSelectOptions = (options) => {
    let html = ''
    Object.keys(options).forEach((optKey) => {
      html += `<option value="${optKey}">${options[optKey]}</option>`
    })
    return html
  }

  /**
   * It takes an object of error messages and returns a string of HTML
   * @param errorMessage - The error message object that we get from the server.
   * @returns A string of HTML
   */
  const renderErrorMessage = (errorMessage) => {
    if (!errorMessage) return ''
  
    let message = ''
    Object.keys(errorMessage).forEach((key) =>
      message += `<small data-contact-form-error="${key}" hidden>${errorMessage[key]}</small>`
    )
  
    return message
  }
