import { calculateBmi } from './calculators/bmi';
import express from 'express';
import { calculateExercises } from './calculators/exercise';

const app = express();
app.use(express.json());

app.get('/hello', (_req, response) => {
  response.send('Hello Full Stack!');
});

app.get("/bmi", (request, response) => {

  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if (!height || !weight)
    return response.status(400).json({
      error: "malformatted parameters"
    });

  return response
    .status(200)
    .json({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(height, weight)
    });

});

app.post("/exercises", (request, response) => {

  const dailyHours = request.body.dailyHours as Array<number>
  const target = request.body.target as number

  if (!dailyHours || !target)
    return response
      .status(400)
      .json({ error: "parameters missing" });

  try {
    const result = calculateExercises(dailyHours, target);
    return response
      .status(200)
      .json(result);
  } catch (error) {
    return response
      .status(400)
      .json({ error: "malformatted parameters" })
  }


});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});