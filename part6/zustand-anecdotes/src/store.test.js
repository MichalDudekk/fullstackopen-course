import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import AnecdoteList from './components/AnecdoteList';

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

    it('setting a filter changes output of useAnecdotes', async () => {
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
        await act(async () => await result.current.setFilter('hurts'));

        const { result: anecdoteResult } = renderHook(() => useAnecdotes());
        expect(anecdoteResult.current).toContain(mockAnegdotes[1]);
        expect(anecdoteResult.current).not.toContain(mockAnegdotes[0]);
    });

    it('voting increases a number of votes of an anecdote', async () => {
        const mockAnecdotes = [
            {
                content: 'If it hurts, do it more often',
                id: '47145',
                votes: 9,
            },
        ];
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
        anecdoteService.update.mockResolvedValue({
            ...mockAnecdotes[0],
            votes: mockAnecdotes[0].votes + 1,
        });

        const { result } = renderHook(() => useAnecdoteActions());
        await act(async () => {
            await result.current.initialize();
        });

        await act(async () => await result.current.vote('47145'));
        const { result: anecdoteResult1 } = renderHook(() => useAnecdotes());
        expect(anecdoteResult1.current).toContainEqual({
            ...mockAnecdotes[0],
            votes: 10,
        });

        await act(async () => await result.current.vote('47145'));
        const { result: anecdoteResult2 } = renderHook(() => useAnecdotes());
        expect(anecdoteResult2.current).toContainEqual({
            ...mockAnecdotes[0],
            votes: 10,
        });
    });
});
