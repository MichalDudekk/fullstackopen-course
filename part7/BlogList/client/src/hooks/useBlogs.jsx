import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import blogService from '../services/blogs';

export const useBlogs = () => {
    const client = useQueryClient();

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: 1,
    });

    const createMutation = useMutation({
        mutationFn: blogService.postBlog,
        onSuccess: (newBlog) => {
            const blogs = client.getQueryData(['blogs']);
            client.setQueryData(['blogs'], blogs.concat(newBlog));
        },
    });

    const updateMutation = useMutation({
        mutationFn: blogService.putBlog,
        onSuccess: (updatedBlog) => {
            const blogs = client.getQueryData(['blogs']);
            client.setQueryData(
                ['blogs'],
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            );
        },
    });

    return {
        blogs: result.data,
        isPending: result.isPending,
        isError: result.isError,
        createBlog: (blog) => {
            createMutation.mutate(blog);
        },
        updateBlog: (blog) => {
            updateMutation.mutate(blog);
        },
    };
};
