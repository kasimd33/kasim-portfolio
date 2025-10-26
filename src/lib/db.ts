import { MongoClient, Db } from 'mongodb'

const globalForMongo = globalThis as unknown as {
  mongo: MongoClient | undefined
  db: Db | undefined
}

let client: MongoClient
let db: Db

if (process.env.NODE_ENV === 'production') {
  client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017')
  db = client.db(process.env.MONGODB_DB || 'portfolio')
} else {
  if (!globalForMongo.mongo) {
    globalForMongo.mongo = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017')
  }
  client = globalForMongo.mongo
  
  if (!globalForMongo.db) {
    globalForMongo.db = client.db(process.env.MONGODB_DB || 'portfolio')
  }
  db = globalForMongo.db
}

export { client, db }