import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartEleven extends CoursePartBase {
  name: "Just a filler";
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartEleven

interface Header {
  courseName: string;
}

const Header: React.FC<Header> = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  );
};

interface Content {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<Content> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(part => (
        <div key={part.name}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Part {
  part: CoursePart;
}
const Part: React.FC<Part> = ({ part }) => {

  switch (part.name) {

    case "Fundamentals":
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>{part.description}</li>
            <li>{`${part.exerciseCount} exercises.`}</li>
          </ul>
        </div>
      );

    case "Using props to pass data":
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>{`${part.exerciseCount} exercises.`}</li>
            <li>{`${part.groupProjectCount} group projects.`}</li>
          </ul>
        </div >
      );

    case "Deeper type usage":
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>{part.description}</li>
            <li>{`${part.exerciseCount} exercises.`}</li>
            <li><a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></li>
          </ul>
        </div >
      );

    case "Just a filler":
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>{part.description}</li>
            <li>{`${part.exerciseCount} exercises.`}</li>
          </ul>
        </div >
      );

    default:
      return assertNever(part);
  }
};

interface Total {
  exercisesTotal: number;
}

const Total: React.FC<Total> = ({ exercisesTotal }) => {
  return (
    <div>
      <p>
        {`Exercises total: ${exercisesTotal}`}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Just a filler",
      exerciseCount: 0,
      description: "Blank",
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total exercisesTotal={courseParts.reduce((a, c) => a + c.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
