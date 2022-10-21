import Validator from '../../js/validator.js'

const form = document.getElementById('contactForm');
const selector = 'data-contact-form' // it should comes from from data-attribute

const handleOnChange = (event) => {
  event.preventDefault();
  alert('enter to handleOnChange');
}

const handleOnSubmit = () => {
  alert('enter to handleOnSubmit');
}

new Validator(form, selector, {
  onChange: handleOnChange,
  onValidSubmit: handleOnSubmit,
})
