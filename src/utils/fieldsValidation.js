const isValidNumber = item => {
  const number = Number(item)
  return Number.isInteger(number) && number >= 0
}
const isValidWeekday = item => item === 'seg' || item === 'ter' || item === 'qua' || item === 'qui' || item === 'sex'
const isValidClassCode = item => {
  const regex = /[A-Z]{4}[0-9]{4}/
  return regex.test(item)
}
const isValidOfferingCode = item => {
  const regex = /OFER[0-9]{4}(?:-[A-Z])?/
  return regex.test(item)
}

const fieldsValidation = {
  number: {
    errorMessage: '*Esse campo deve conter um número',
    isValid: item => isValidNumber(item)
  },
  weekday: {
    errorMessage: '*Esse campo deve conter dias da semana (seg, ter, qua, qui, sex)',
    isValid: item => isValidWeekday(item)
  },
  classCode: {
    errorMessage: '*Esse campo deve conter um código válido (ex.: CCMP0027)',
    isValid: item => isValidClassCode(item)
  },
  offeringCode: {
    errorMessage: '*Esse campo deve conter um código válido (ex.: OFER0027)',
    isValid: item => isValidOfferingCode(item)
  }
}

export default fieldsValidation