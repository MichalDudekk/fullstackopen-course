import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';

const BlogList = () => {
    const result = useBlogs();

    if (result.isPending) return null;

    if (result.isError) return <>Error</>;

    const blogs = result.blogs.toSorted(
        (blogA, blogB) => blogB.likes - blogA.likes
    );

    return (
        <>
            <h2>blogs</h2>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default BlogList;
