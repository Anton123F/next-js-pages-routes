import {useRef, useState} from "react";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  function formSubmitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    const payLoad = {email: enteredEmail, text: enteredFeedback}

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(payLoad),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data))

  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => {
        console.log(data.feedback)
        setFeedbacks(data.feedback);
      })
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor='email'>Your email address</label>
          <input type="email" id='email' ref={emailRef}/>
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr/>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbacks.map((item, index) => <li key={index}>{item.feedback}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
