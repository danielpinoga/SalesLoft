const allEmails = ["lauernce_ward@wittingkuhic.org", "rmia@mertzrath.info", "alna@hirthe.biz", "ke_nruel@rauward.info", "jncksoa@sawayn.com", "odrthy@flatley.biz", "anesl.howe@padbergbins.info", "madison@dubuque.name", "camron.nisolac@harber.co", "kanira@heaney.biz", "an@redhettingerkohler.com", "raa_beetty@quigley.info", "cajkeline@lemke.co", "ercik@lubowitz.name", "baomi.keenler@okon.org", "miwnie_nisozk@damore.net", "dulhe.cilll@reichert.biz", "nntwoa@roberts.co", "tmohas@feestwyman.io", "athena@schroeder.net", "jrrey@glover.co", "george_aiegwnd@boyer.name", "enoch.kenlieg@beahandooley.com", "mamixe@lindgren.info", "isnaoj_nathz@ihooberbrunner.net"]

const breakEmailIntoSubStrings = (email, subLength, subStrings = {}) => {
  for (let i = 0; i < email.length - subLength + 1; i++) {
    const subString = email.substr(i, subLength)
    if (!subStrings[subString]) subStrings[subString] = { [email]: 0 }
    subStrings[subString][email] ? subStrings[subString][email] += 1 : subStrings[subString][email] = 1
  }
  return subStrings
}

const subLengthFactor = (subLength) => {
  return subLength / 2
}
/*
Find all substrings within the given email and count their frequency
Iterate through the substrings found in step 1
  If the current substring is in the tracking object
    Iterate through all emails that also contain that substring
      update the potentialMatch tracking object for that email
        add the minimum count between (matches in email) and (matches in new email)
        multiply by the subLength factor
*/
const checkNewEmail = (newEmail, subLength, allEmailAnalysis) => {
  const dupeTracker = {}
  const newEmailAnalysis = breakEmailIntoSubStrings(newEmail, subLength)
  const allFoundSubstrings = Object.keys(newEmailAnalysis)
  allFoundSubstrings.forEach(subString => {
    if (allEmailAnalysis[subString]) {
      const emailsWithSubString = Object.keys(allEmailAnalysis[subString])
      emailsWithSubString.forEach(email => {
        const hitsInAllEmails = allEmailAnalysis[subString][email]
        const hitsInNewEmail = newEmailAnalysis[subString][newEmail]
        const points = Math.min(hitsInAllEmails, hitsInNewEmail) * subLengthFactor(subLength)
        if (dupeTracker[email]) dupeTracker[email] += points
        else dupeTracker[email] = points
      })
    }
  })
  return dupeTracker
}

const checkForDupes = (newEmail) => {
  const dupeCheckResults = {}
  for (let i = 0; i < newEmail.length; i++) {
    const allEmailAnalysis = allEmails.reduce((tracker, email) => {
      return breakEmailIntoSubStrings(email, i, tracker)
    }, {})
    const newEmailAnalysis = checkNewEmail(newEmail, i, allEmailAnalysis)
    Object.keys(newEmailAnalysis).reduce((finalAnalysis, matchedEmail) => {
      if (finalAnalysis[matchedEmail]) {
        finalAnalysis[matchedEmail] += newEmailAnalysis[matchedEmail]
      } else {
        finalAnalysis[matchedEmail] = newEmailAnalysis[matchedEmail]
      }
      return finalAnalysis
    }, dupeCheckResults)
  }
  return dupeCheckResults
}


const newEmail = "lauernce_ward@wittingkuhic.org"

console.log('input email:')
console.log(newEmail)
// console.log('all emails in system', allEmails)
console.log()
console.log('points for all emails in the system:')
console.log(checkForDupes(newEmail))