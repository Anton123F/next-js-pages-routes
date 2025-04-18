import {MongoClient} from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const name = process.env.DATABASE_NAME;
const comments = process.env.COMMENTS_COLLECTION;
const emails = process.env.EMAILS_COLLECTION;

export const dbOpt = {
  name,
  collections : {
    comments,
    emails
  }
}

const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;