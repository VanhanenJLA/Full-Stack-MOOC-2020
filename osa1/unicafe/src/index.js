import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  )
}

const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = () => good + neutral + bad;
  const positive = () => good / all();
  const average = () => (1 * good + -1 * bad) / all();

  if (all() <= 0) return <>No feedback given</>

  return (
    <>

      <table>
        <tbody>
          <StatisticsLine value={good} text={'good'} />
          <StatisticsLine value={neutral} text={'neutral'} />
          <StatisticsLine value={bad} text={'bad'} />

          <StatisticsLine value={all()} text={'all'} />
          <StatisticsLine value={average()} text={'average'} />
          <StatisticsLine value={positive()} text={'positive'} />
        </tbody>
      </table>

    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

// Vanhanen Jouni