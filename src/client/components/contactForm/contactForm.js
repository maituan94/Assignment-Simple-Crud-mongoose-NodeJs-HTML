import Validator from "../../js/validator/validator.js";
import renderFormElements from "./customerElements.js";

window.onload = () => {
  const form = document.getElementById("contactForm");
  renderFormElements(form);
  const selector = "contact-form"; // It should comes from from data-attribute

  const handleOnChange = (event) => {
    //event.preventDefault();
    //alert("enter to handleOnChange");
    console.log(event.id);
  };

  const handleOnSubmit = () => {
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);
    console.log({ body }); // @TODO Remove this conosle after to connect with data base
    alert(
      `Make a call to backend: POST, UPDATE, DELETE, etc, ${JSON.stringify(
        body
      )}`
    );
  };

  new Validator(form, selector, {
    onChange: handleOnChange,
    onValidSubmit: handleOnSubmit,
  });
};
