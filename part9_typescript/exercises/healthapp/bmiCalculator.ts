type BmiResult =
    | 'Underweight (Severe thinness)'
    | 'Underweight (Moderate thinness)'
    | 'Underweight (Mild thinness)'
    | 'Normal range'
    | 'Overweight (Pre-obese)'
    | 'Obese (Class I)'
    | 'Obese (Class II)'
    | 'Obese (Class III)';

const parseInput = (args: string[]): { heightCm: number; weightKg: number } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const heightCm = Number(args[2]);
    const weightKg = Number(args[3]);
    if (isNaN(heightCm) || isNaN(weightKg))
        throw new Error('Invalid arguments');
    return { heightCm, weightKg };
};

export const calculateBmi = (heightCm: number, weightKg: number): BmiResult => {
    const bmi = weightKg / Math.pow(heightCm / 100, 2);

    if (bmi < 16) return 'Underweight (Severe thinness)';
    if (bmi < 17) return 'Underweight (Moderate thinness)';
    if (bmi < 18.5) return 'Underweight (Mild thinness)';
    if (bmi < 25) return 'Normal range';
    if (bmi < 30) return 'Overweight (Pre-obese)';
    if (bmi < 35) return 'Obese (Class I)';
    if (bmi < 40) return 'Obese (Class II)';
    if (bmi >= 40) return 'Obese (Class III)';

    throw new Error('Could not calculate bmi');
};

try {
    const { heightCm, weightKg } = parseInput(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(`Error: ${e.message}`);
    } else {
        console.log('Something bad happened');
    }
}
