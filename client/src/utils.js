export const merge = (...obj) => Object.assign({}, ...obj)

export const countLettersInEmails = (peopleArray) => {
  const peopleIds = Object.keys(peopleArray)
  return peopleIds.reduce((letterCount, id) => {
    const currentEmail = peopleArray[id].email_address
    return currentEmail.split('').reduce((letterCount, char) => {
      letterCount[char] ? letterCount[char] += 1 : letterCount[char] = 1
      return letterCount
    }, letterCount)
  }, {})
}