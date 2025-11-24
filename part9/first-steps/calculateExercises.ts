interface ValuesExercise {
  hours: number[],
  target: number,
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const argumentsValue = (hoursArgs: number[], targetVal: number) : ValuesExercise => {

  if (hoursArgs.length < 2) throw new Error('Not enough arguments');
  if (hoursArgs.length > 8) throw new Error('Too many arguments');
    
  const target = targetVal;
  if(isNaN(target)) throw new Error("Target must be a number");


  const hours = hoursArgs.map(value => {
    const num = Number(value);
    if(isNaN(num)) throw new Error("All hours must be valid numbers")
      return num
  })

  return { hours, target }
}

export const calculateExercise = (
  target: number,
  hours: number[],
) : Result => {

  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = (hours.reduce((a, b) => a + b, 0)) / periodLength;
  const success = average >= target;

  const getRating = (average: number, target: number) : number => {
    if (average < target * 0.9) return 1;
    if (average < target) return 2;
    return 3;
  }

  const getRatingDescription = (rating: number): string => {
    if (rating === 1) {
      return "Don't give up! You can do better next week!";
    }
    if (rating === 2) {
      return "Good job but try doing better next week!";
    }
    return "Nice work! Keep it up!";
  }

  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating)

   return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

/* try {
  const {hours, target} = argumentsValue(process.argv.slice(2))
  console.log(calculateExercise(target, hours))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
} */

