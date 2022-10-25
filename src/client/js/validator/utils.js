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
  } else {
    const value = valueStr.length
    const max = parseFloat(maxStr, 10)

    return !value.isNaN && !max.isNaN && value > max
  }
}

export const passwordNotMatch = (valueStr, type) => {
  const pass1 = document.getElementById('custPassword').value
  const pass2 = document.getElementById('custConfirmPassword').value
  if (type === 'password'){
    if (valueStr !== pass1 || valueStr !== pass2){
      return true
    } else {
      return false
    }
  }
}
