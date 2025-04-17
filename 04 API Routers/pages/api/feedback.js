import fs from 'fs'
import path from 'path';

export function getPathToFile() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractData(path) {
  const fileData = fs.readFileSync(path);
  return JSON.parse(fileData);
}

export default function (req, res) {
  if (req.method === 'POST') {
    const newFeedback = {
      id: new Date().toString(),
      email: req.body.email,
      feedback: req.body.text
    }
    const pathToFile = getPathToFile();
    if (!fs.existsSync(pathToFile)) {
      fs.writeFileSync(pathToFile, `[${JSON.stringify(newFeedback)}]`);
      res.status(201).json({message: 'Success!', feedback: newFeedback});
    } else {
      const data = extractData(pathToFile);
      data.push(newFeedback);
      fs.writeFileSync(pathToFile, JSON.stringify(data));
      res.status(201).json({message: 'Success!', feedback: newFeedback});
    }
  } else {
    const path = getPathToFile();
    const data = extractData(path);
    res.status(200).json({feedback: data})
  }
}