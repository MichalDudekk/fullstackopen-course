import { create } from 'zustand';

export const useStatisticsStore = create((set) => ({
    good: 0,
    neutral: 0,
    bad: 0,
    actions: {
        incrementGood: () =>
            set((state) => ({
                good: state.good + 1,
            })),
        incrementNeutral: () =>
            set((state) => ({
                neutral: state.neutral + 1,
            })),
        incrementBad: () =>
            set((state) => ({
                bad: state.bad + 1,
            })),
    },
}));

export const useStatisticsGetGood = () =>
    useStatisticsStore((state) => state.good);
export const useStatisticsGetNeutral = () =>
    useStatisticsStore((state) => state.neutral);
export const useStatisticsGetBad = () =>
    useStatisticsStore((state) => state.bad);
export const useStatisticsActions = () =>
    useStatisticsStore((state) => state.actions);
