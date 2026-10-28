import { describe, it, expect } from 'vitest';
import { calculateBmi } from './bmiCalculator.js';

describe('calculateBmi', () => {
    it('calculates a realistic case', () => {
        expect(calculateBmi(180, 70)).toBe('Normal range');
        expect(calculateBmi(180, 100)).toBe('Obese (Class I)');
    });

    it('throws when result is not a number', () => {
        expect(() => calculateBmi(NaN, 70)).toThrow('Could not calculate bmi');
    });
});
