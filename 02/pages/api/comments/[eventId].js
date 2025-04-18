import clientPromise, {dbOpt} from "../../../lib/mongodb";
import {addDocumentToMongo, getAllData} from "../../../helpers/db-helper";

export default async function handler(req, res) {
  const method = req.method;
  const {eventId} = req.query;

  if (method === 'POST') {
    const {email, name, text} = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({message: 'invalid input'})
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }
    console.log(newComment)

    let client = null;
    try {
      client = await clientPromise;
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database error!'});
      return;
    }

    try {
      await addDocumentToMongo(client, dbOpt.collections.comments, newComment)
      res.status(201).json({message: 'added comment', comment: newComment})
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'});
    }
  }

  if (method === 'GET') {

    let client = null;
    try {
      client = await clientPromise;
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database error!'});
      return;
    }

    try {
      const comments = await getAllData(client, dbOpt.collections.comments);
      res.status(201).json({message: `all data from ${dbOpt.collections.comments} retrieved`, comments: comments})
    } catch (error) {
      res.status(500).json({message: 'Getting data failed'});
    }
  }
}