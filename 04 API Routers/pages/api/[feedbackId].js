import {extractData, getPathToFile} from "./feedback";

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  console.log(`feedback id = ${feedbackId}`);
  const pathToFile = getPathToFile();
  const allFeedbacks = extractData(pathToFile);
  const feedback = allFeedbacks.find(feedback => feedback.id === feedbackId);

  res.status(200).json({feedback})
}