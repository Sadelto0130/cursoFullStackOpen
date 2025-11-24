interface BmiValues {
  value1: number;
  value2: number;
}

export const argumentsBmi = (args: string[]) : BmiValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if( !isNaN(Number(args[2])) && !isNaN(Number(args[3])) ) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

export const calculatorBmi = (a: number, b: number) => {
  const alturaM = b / 100;
  const alturaCuadrado = alturaM * alturaM;

  const imc = a / alturaCuadrado;

  if( imc < 18.5) {
      return {classification: "Low weight", imc}
  } else if (imc < 25) {
      return {classification: "Norma weight", imc}      
  } else if (imc < 30) {
      return {classification: "Over weight", imc} 
  } else {
      return {classification: "Obesity", imc} 
  }
}

/* try {
  const { value1, value2 } = argumentsBmi(process.argv);
  calculatorBmi(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
} */