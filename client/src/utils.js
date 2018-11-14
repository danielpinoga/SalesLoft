export const merge = (...obj) => Object.assign({}, ...obj)

export const createEmailShards = (email, shardLength, shards = {}) => {
  for (let i = 0; i < email.length - shardLength + 1; i++) {
    const shard = email.substr(i, shardLength)
    if (!shards[shard]) shards[shard] = { [email]: 0 }
    shards[shard][email] ? shards[shard][email] += 1 : shards[shard][email] = 1
  }
  return shards
}

export const shardSingleEmail = (email) => {
  const allShards = {}
  for (let shardLength = 1; shardLength <= email.length; shardLength++) {
    allShards[shardLength] = createEmailShards(email, shardLength)
  }
  return allShards
}

export const shardMultipleEmails = (emails) => {
  const emailArray = Object.keys(emails)
  const maxEmailLength = Math.max(...emailArray.map(email => email.length))
  const allShards = {}
  for (let shardLength = 1; shardLength <= maxEmailLength; shardLength++) {
    allShards[shardLength] = emailArray.reduce((shards, email) => createEmailShards(email, shardLength, shards), {})
  }
  return allShards
}

export const determineUnshardedEmails = (allPeople, shardedEmails) => {
  const emailsToBeSharded = {}
  const allEmails = Object.keys(allPeople).map(id => allPeople[id].email_address)
  const filteredEmails = allEmails.filter(email => !shardedEmails[email])
  filteredEmails.forEach(email => emailsToBeSharded[email] = true)
  return emailsToBeSharded
}

//This can be done way more gracefully/dynamically with recursion... But I didn't think about that in time and I'm already done with it...
export const deepMergeShards = (existingShards, newShards) => {
  const shardLengths = Object.keys(newShards)
  shardLengths.forEach(shardLength => {
    const shardsAtLength = newShards[shardLength]
    if (!existingShards[shardLength]) {
      existingShards[shardLength] = shardsAtLength
    } else {
      const shards = Object.keys(shardsAtLength)
      shards.forEach(shard => {
        const emailCounts = shardsAtLength[shard]
        if (!existingShards[shardLength[shard]]) {
          existingShards[shardLength][shard] = emailCounts
        } else {
          const emails = Object.keys(emailCounts)
          emails.forEach(email => {
            if (!existingShards[shardLength][shard][email]) {
              existingShards[shardLength][shard][email] = emailCounts[email]
            } else {
              existingShards[shardLength][shard][email] += emailCounts[email]
            }
          })
        }
      })
    }
  })
  return existingShards
}

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




// BELOW LOGIC TO BE REFACTORED AND MOVED


const breakEmailIntoSubStrings = (email, subLength, subStrings = {}) => {
  for (let i = 0; i < email.length - subLength + 1; i++) {
    const subString = email.substr(i, subLength)
    if (!subStrings[subString]) subStrings[subString] = { [email]: 0 }
    subStrings[subString][email] ? subStrings[subString][email] += 1 : subStrings[subString][email] = 1
  }
  return subStrings
}

const subLengthFactor = (subLength) => {
  return subLength * 10
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

export const checkForDupeLogic = (newEmail, allEmailShards) => {
  const dupeCheckResults = {}
  for (let i = 1; i < newEmail.length; i++) {
    const allEmailAnalysis = allEmailShards[i]
    if (!allEmailAnalysis) continue
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
  const sortedDupeCheckResults = Object.keys(dupeCheckResults).sort((a, b) => dupeCheckResults[b] - dupeCheckResults[a])

  if (sortedDupeCheckResults[0] === newEmail) sortedDupeCheckResults.shift()
  const bestDupe = sortedDupeCheckResults[0]
  const points = dupeCheckResults[bestDupe]
  return { bestDupe, points }
}