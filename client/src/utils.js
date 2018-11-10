export const merge = (...obj) => Object.assign({}, ...obj)

export const createEmailShards = (email, shardLength, shards = {}) => {
  for (let i = 0; i < email.length - shardLength + 1; i++) {
    const shard = email.substr(i, shardLength)
    if (!shards[shard]) shards[shard] = { [email]: 0 }
    shards[shard][email] ? shards[shard][email] += 1 : shards[shard][email] = 1
  }
  return shards
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