const user = JSON.parse(sessionStorage.getItem("user-data"));

for (const [key, value] of Object.entries(user)) {
  const el = document.getElementById(key)
  if (el) {
    el.value = value
  }
}
