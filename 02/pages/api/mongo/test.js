import clientPromise, {dbOpt} from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(dbOpt.name);
    console.log(dbOpt)
    const collection = db.collection(dbOpt.collections.comments);
    const data = await collection.find({}).toArray();
    res.status(200).json({success: true, data});
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({success: false, error: "Internal Server Error"});
  }
}