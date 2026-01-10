import { MongoClient } from "mongodb"; // MongoDB native driver

let mongoClient: MongoClient; // MongoClient instance
let clientPromise: Promise<MongoClient>; // Shared connection promise

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // Global cache for connection
}

// check if we already have Mongo connection or not (no? create one... yes? reuse it)
if (!global._mongoClientPromise) {
  mongoClient = new MongoClient(process.env.MONGODB_URI!); // Create new client
  global._mongoClientPromise = mongoClient.connect(); // Connect once and cache promise
}

clientPromise = global._mongoClientPromise; // Reuse cached promise

export const client = await clientPromise; // Export connected client (Better-Auth uses this)
