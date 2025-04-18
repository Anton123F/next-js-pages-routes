import {dbOpt} from "../lib/mongodb";

export const addDocumentToMongo = async (client, collectionName, data) => {
  const db = client.db(dbOpt.name);
  const collection = db.collection(collectionName);
  await collection.insertOne(data)
}

export const getAllData = async (client, collectionName) => {
  const db = client.db(dbOpt.name);
  const collection = db.collection(collectionName);
  return await collection.find({}).toArray();
}