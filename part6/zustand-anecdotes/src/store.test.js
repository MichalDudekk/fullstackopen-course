import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    },
}));

import anecdoteService from './services/anecdotes';
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store';

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' });
    vi.clearAllMocks();
});

describe('useAnecdoteActions', () => {
    it('initialize loads anecdote from service', async () => {
        const mockAnecdotes = [
            {
                content: 'If it hurts, do it more often',
                id: '47145',
                votes: 9,
            },
        ];
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

        const { result } = renderHook(() => useAnecdoteActions());

        await act(async () => {
            await result.current.initialize();
        });

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current).toEqual(mockAnecdotes);
    });

    it('anecdotes received from the store are sorted by votes', async () => {
        const mockAnegdotes = [
            {
                content:
                    'Adding manpower to a late software project makes it later!',
                id: '21149',
                votes: 2,
            },
            {
                content: 'If it hurts, do it more often',
                id: '47145',
                votes: 9,
            },
        ];
        anecdoteService.getAll.mockResolvedValue(mockAnegdotes);

        const { result } = renderHook(() => useAnecdoteActions());
        await act(async () => await result.current.initialize());

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current).toHaveLength(2);
        expect(anecdoteResult.current[1]).toStrictEqual(mockAnegdotes[1]);
        expect(anecdoteResult.current[0]).toStrictEqual(mockAnegdotes[0]);
    });
});
