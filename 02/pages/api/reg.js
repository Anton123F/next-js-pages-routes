import clientPromise, {dbOpt} from "../../lib/mongodb";
import {addDocumentToMongo} from '../../helpers/db-helper';


export default async function handler(req, res) {
  if (req.method === "POST") {
    const {email} = req.body;

    if (!email && !email.includes('@')) {
      res.status(422).json({message: 'Invalid email address'})
      return
    }

    let client = null;
    try {
      client = await clientPromise;
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database error!'});
      return;
    }

    try {
      await addDocumentToMongo(client, dbOpt.collections.emails, {email: email})
      res.status(200).json({message: 'Email added', email: email});
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'});
    }
  } else {
    res.status(200).json({message: 'test response!'})
  }
}