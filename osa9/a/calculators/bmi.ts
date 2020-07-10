enum Severity {
  CATEGORY1 = "Very severely underweight",
  CATEGORY2 = "Severely underweight",
  CATEGORY3 = "Underweight",
  CATEGORY4 = "Normal (healthy weight)",
  CATEGORY5 = "Overweight",
  CATEGORY6 = "Obese Class I (Moderately obese)",
  CATEGORY7 = "Obese Class II (Severely obese)",
  CATEGORY8 = "Obese Class III (Very severely obese)"
}

type Centimeter = number;
type Kilogram = number;

export const calculate = (height: Centimeter, weight: Kilogram): Severity => {

  if (height <= 0)
    throw new Error("Height can't be negative or zero.")
  if (weight <= 0)
    throw new Error("Weight can't be negative or zero.")

  height /= 100; // Conversion to meters.
  const bmi = weight / Math.pow(height, 2);

  return describe(bmi);

  function describe(bmi: number) {
    if (bmi <= 15)
      return Severity.CATEGORY1;
    if (bmi <= 16)
      return Severity.CATEGORY2;
    if (bmi <= 18.5)
      return Severity.CATEGORY3;
    if (bmi <= 25)
      return Severity.CATEGORY4;
    if (bmi <= 30)
      return Severity.CATEGORY5;
    if (bmi <= 35)
      return Severity.CATEGORY6;
    if (bmi <= 40)
      return Severity.CATEGORY7;
    if (bmi > 40)
      return Severity.CATEGORY8;
    throw new Error("BMI out of range.");
  }

};

run(process.argv)
function run(args: Array<string>) {
  if (args.length < 4)
    throw new Error("Minimum of two (2) arguments are needed.")

  const [, , height, weight] = args;
  console.log(calculate(Number(height), Number(weight)));
}