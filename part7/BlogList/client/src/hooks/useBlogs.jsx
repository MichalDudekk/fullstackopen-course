import { useQuery, useQueryClient } from '@tanstack/react-query';

import blogService from '../services/blogs';

export const useBlogs = () => {
    const client = useQueryClient();

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: 1,
    });

    return {
        blogs: result.data,
        isPending: result.isPending,
        isError: result.isError,
    };
};
