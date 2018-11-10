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
  for (let shardLength = 0; shardLength <= maxEmailLength; shardLength++) {
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