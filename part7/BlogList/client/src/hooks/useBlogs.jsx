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

    const deleteMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: (blogId) => {
            const blogs = client.getQueryData(['blogs']);
            client.setQueryData(
                ['blogs'],
                blogs.filter((blog) => blog.id !== blogId)
            );
        },
    });

    return {
        blogs: result.data,
        isPending: result.isPending,
        isError: result.isError,
        createBlog: async (blog) => {
            await createMutation.mutateAsync(blog);
        },
        updateBlog: (blog) => {
            updateMutation.mutate(blog);
        },
        deleteBlog: (blog) => {
            deleteMutation.mutate(blog);
        },
    };
};
