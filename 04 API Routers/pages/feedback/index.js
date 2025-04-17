import {extractData, getPathToFile} from "../api/feedback";
import {useState} from "react";

export default function FeedbackPage(props) {
  const [feedback, setFeedback] = useState(null);
  const {feedbackItems} = props;

  const showDetailsHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then(data => setFeedback(data.feedback))
  }

  return <>
    {feedback && (<p>{feedback.email}</p>)}
    <ul>
      {feedbackItems.map(item => <li key={item.id}>
        {item.feedback}
        <button onClick={showDetailsHandler.bind(null, item.id)}>Show Details</button>
      </li>)}
    </ul>
  </>
}

export async function getStaticProps() {
  const pathToFile = getPathToFile();
  const data = extractData(pathToFile);

  return {
    props: {
      feedbackItems: data
    }
  }
}