interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
};

enum Rating {
  INSUFFICIENT = "Insufficient",
  PASS = "Pass",
  SATISFACTORY = "Satisfactory",
  GOOD = "Good",
  VERY_GOOD = "Very good",
  EXCELLENT = "Excellent",
};

export const calculate = (dailyHours: Array<number>, target: number): Result => {

  const periodTotalHours = dailyHours.reduce((a, c) => a += c)
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.reduce((a, c) => c > 0 ? a += 1 : a += 0, 0)
  const success = periodTotalHours >= target
  const rating = periodTotalHours - target
  const ratingDescription = describe(rating)
  const average = periodTotalHours / trainingDays

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average }

  function describe(erotus: number): Rating {
    if (erotus <= 1)
      return Rating.INSUFFICIENT;
    if (erotus <= 2)
      return Rating.PASS;
    if (erotus <= 3)
      return Rating.SATISFACTORY;
    if (erotus <= 4)
      return Rating.GOOD;
    if (erotus <= 5)
      return Rating.VERY_GOOD;
    if (erotus >= 5)
      return Rating.EXCELLENT;

    throw new Error("Something went bonkers");
  }
};

run(process.argv)
function run(args: Array<string>) {
  if (args.length < 4)
    throw new Error("Minimum of two (2) arguments are needed.")

  const [, , target, ...dailyHours] = args;
  console.log(calculate(dailyHours.map(v => Number(v)), Number(target)));
}