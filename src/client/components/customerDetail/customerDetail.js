import { getDateFormat } from "../../js/validator/utils.js";

const user = JSON.parse(sessionStorage.getItem("user-data"));

for (const [key, value] of Object.entries(user)) {
  const el = document.getElementById(key)
  if (el) {
    if (key === 'dateOfBirth') {
      el.value = getDateFormat({ date: value })
    } else {
      el.value = value
    }
  }
}
