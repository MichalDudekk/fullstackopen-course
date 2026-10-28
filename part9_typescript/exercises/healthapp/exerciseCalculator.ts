interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    exerciseHours: number[],
    target: number,
): Result => {
    const average =
        exerciseHours.reduce((sum, hours) => sum + hours, 0) /
        exerciseHours.length;

    const rating = target - average <= 0 ? 3 : target - average < 0.5 ? 2 : 1;

    return {
        periodLength: exerciseHours.length,
        trainingDays: exerciseHours.filter((hours) => hours > 0).length,
        success: target - average > 0 ? false : true,
        rating: rating,
        ratingDescription:
            rating === 3
                ? 'perfect!'
                : rating === 2
                  ? 'not too bad but could be better'
                  : 'disappointing',
        target: target,
        average: average,
    };
};

const parseInput = (
    args: string[],
): { exerciseHours: number[]; target: number } => {
    if (args.length < 4) throw new Error('not enough arguments');

    const validArguments = args.slice(2).map((n) => Number(n));
    if (validArguments.some((n) => isNaN(n)))
        throw new Error('arguments must be numbers');

    return {
        exerciseHours: validArguments.slice(1),
        target: validArguments[0],
    };
};

const { exerciseHours, target } = parseInput(process.argv);
console.log(calculateExercises(exerciseHours, target));
