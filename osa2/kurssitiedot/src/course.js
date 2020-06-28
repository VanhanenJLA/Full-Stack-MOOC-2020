import React from 'react'

const Course = ({ course }) => {

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
        <h3>Total of exercises {total}</h3>
      </>
    )
  }


  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )

}

export default Course

