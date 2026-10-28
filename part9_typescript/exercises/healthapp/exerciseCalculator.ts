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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
