export const invalidPattern = (value, pattern) => {
  return new RegExp(pattern).test(value) === false
}

export const invalidMin = (valueStr, minStr, type) => {
  if (type === 'date') {
    const date = new Date(valueStr)
    const minDate = new Date(minStr)

    return date < minDate
  } else {
    const value = valueStr.length
    const min = parseFloat(minStr, 10)

    return !value.isNaN && !min.isNaN && value < min
  }
}

export const invalidMax = (valueStr, maxStr, type) => {

  if (type === 'date') {
    const date = new Date(valueStr)
    const maxDate = new Date(maxStr)

    return date > maxDate
  }

  return date < maxDate
}

export const passwordNotMatch = (valueStr, type) => {
  const pass1 = document.getElementById('password').value
  const pass2 = document.getElementById('confirmPassword').value
  if (type === 'password') {
    if (valueStr !== pass1 || valueStr !== pass2) {
      return true
    } else {
      return false
    }
  }
}

export const getDateFormat = ({ date, toShow = false }) => {
  const newDate = date ? new Date(date) : new Date();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate() + 1;
  const year = newDate.getFullYear();

  if (toShow) {
    return `${year}-${month}-${day}`;
  }

  return `${month}-${day}-${year}`;
} 
