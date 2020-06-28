import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using propss to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      }]
  }
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part part={part} />)}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises);
  const total = exercises.reduce((acc, cur) => acc + cur);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// Vanhanen Jouni