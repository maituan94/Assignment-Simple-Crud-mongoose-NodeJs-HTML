import Validator from '../../js/validator/validator.js'

const form = document.getElementById('contactForm');
const selector = 'contact-form' // It should comes from from data-attribute

const handleOnChange = (event) => {
  event.preventDefault();
  alert('enter to handleOnChange');
}

const handleOnSubmit = () => {
  alert('Make a call to backend: POST, UPDATE, DELETE, etc');
}

new Validator(form, selector, {
  onChange: handleOnChange,
  onValidSubmit: handleOnSubmit,
})
