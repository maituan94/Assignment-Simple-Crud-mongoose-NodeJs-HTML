import {
  renderInput,
  renderRadioComponent,
  renderSingleCheckbox,
  renderTexarea,
  renderSelect,
  renderDate
} from "../formElements.js"

const provinces = {
  NL: 'Newfoundland and Labrador',
  PE: 'Prince Edward Island',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  QC: 'Quebec',
  ON: 'Ontario',
  MB: 'Manitoba',
  SK: 'Saskatchewan',
  AB: 'Alberta',
  BC: 'British Columbia',
  YT: 'Yukon',
  NT: 'Northwest Territories',
  NU: 'Nunavut'
}

const customerElements = [
  [
    {
      id: 'firstName',
      label: 'First name',
      type: 'text',
      isRequired: true,
      pattern: '^[A-Za-z][A-Za-z0-9 ]+$',
      placeholder: 'Enter your first name',
      idError: 'contactErrorFirstName',
      errorMessage: {
        pattern: "First name must be at least 2 characters and not start with number or special characters",
        required: "This field is required",
      }
    },
    {
      id: 'lastName',
      label: 'Last name',
      type: 'text',
      isRequired: true,
      pattern: '^[A-Za-z][A-Za-z0-9 ]+$',
      placeholder: 'Enter your last name',
      min: 2,
      idError: 'contactErrorLastName',
      errorMessage: {
        pattern: "Last name must be at least 2 characters and not start with number or special characters",
        required: "This field is required",
      }
    }
  ],
  [
    {
      id: 'email',
      label: 'Email',
      type: 'text',
      isRequired: true,
      pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$",
      placeholder: 'Enter your email',
      idError: 'contactErrorEmail',
      errorMessage: {
        required: "This field is required",
        pattern: "Please insert a valid email"
      }
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      isRequired: true,
      idError: 'contactErrorDateOfBirth',
      errorMessage: {
        required: "This field is required",
        max: "The date value should lower"
      }
    }
  ],
  [
    {
      id: 'phone',
      label: 'Phone number',
      type: 'text',
      isRequired: true,
      pattern: "^\\+[0-9]{1,3}\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}$",
      placeholder: '+1(234)456-7777',
      idError: 'contactErrorPhone',
      errorMessage: {
        required: "This field is required",
        pattern: "Please insert a valid phone number. For example: +1(234)456-7777"
      }
    }
  ],
  [
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      isRequired: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$",
      placeholder: 'Please enter password',
      idError: 'contactErrorPassword',
      errorMessage: {
        required: "This field is required",
        pattern: "Please insert a valid password",
        match: "Passwords do not match"
      }
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      isRequired: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$",
      placeholder: 'Please confirm password',
      idError: 'contactErrorConfirmPassword',
      errorMessage: {
        required: "This field is required",
        pattern: "Please insert a valid password",
        match: "Passwords do not match"
      }
    }
  ],
  [
    {
      id: 'address',
      label: 'Home address',
      type: 'text',
      isRequired: false,
      pattern: "",
      placeholder: 'Please enter home address',
      idError: 'contactErrorAddress',
      errorMessage: {}
    },
    {
      id: 'homeNumber',
      label: 'Home Number',
      type: 'text',
      isRequired: false,
      pattern: "",
      placeholder: 'Please enter home number',
      idError: 'contactErrorHomeNumber',
      errorMessage: {}
    },
    {
      id: 'state',
      label: 'Province',
      type: 'select',
      isRequired: false,
      pattern: "",
      placeholder: '',
      idError: 'contactErrorState',
      errorMessage: {},
      options: provinces
    }
  ],
  [
    {
      id: 'gender',
      label: 'Gender',
      type: 'radio',
      isRequired: false,
      pattern: '',
      placeholder: '',
      idError: 'contactErrorGender',
      errorMessage: {},
      options: [
        'male', 'female', 'others'
      ]
    }
  ],
  [
    {
      id: 'question',
      label: 'What is your question?',
      type: 'textarea',
      isRequired: true,
      pattern: '',
      placeholder: 'Enter your question',
      idError: 'contactErrorQuestion',
      errorMessage: {},
      rows: '3'
    }
  ],
  [
    {
      id: 'isSendNews',
      label: 'Send me monthly newsletter',
      type: 'checkbox',
      isRequired: false,
      pattern: '',
      placeholder: '',
      idError: 'contactErrorSendNews',
      errorMessage: {}
    }
  ]
]

/**
 * It takes a form element as an argument, loops through the customerElements array, and renders each
 * element in the form
 * @param form - The form element that we want to render the form elements into.
 */
const renderFormElements = (form) => {
  let innerForm = ''
  customerElements.forEach((element) => {
    innerForm += `<div class="grid grid-cols-${element.length} gap-4">`
    element.forEach((comp) => {
      innerForm += renderComponent(comp)
    })
    innerForm += `</div>`
  })

  innerForm += `<!-- Submit button -->
    <div class="bg-gray-50 px-4 py-3 text-center sm:px-6">
      <button 
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit
      </button>
    </div>`

  form.innerHTML = innerForm
}

/**
 * If the component is a radio or checkbox, render the component as a radio or checkbox. If the
 * component is a textarea, render the component as a textarea. Otherwise, render the component as an
 * input
 * @param component - The component object
 * @returns A string of HTML
 */
const renderComponent = (component) => {
  if (!component) return ""
  /* Checking if the component type is radio, if it is, it will render the radio component. */
  if (component.type === "radio") return renderRadioComponent(component)

  /* Checking if the component type is checkbox, if it is, it will render the checkbox component. */
  if (component.type === "checkbox") return renderSingleCheckbox(component)

  /* Checking if the component type is textarea, if it is, it will render the textarea component. */
  if (component.type === "textarea") return renderTexarea(component)

  /* Checking if the component type is select, if it is, it will render the select component. */
  if (component.type === "select") return renderSelect(component)

  /* Checking if the component type is select, if it is, it will render the select component. */
  if (component.type === "date") return renderDate(component)

  /* Returning the renderInput function with the component as an argument. */
  return renderInput(component)
}

export default renderFormElements
