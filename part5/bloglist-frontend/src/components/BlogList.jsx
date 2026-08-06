import Blog from './Blog';

const BlogList = ({ addNotification, blogs, setBlogs, user }) => {
    const handleLike = () => {};
    const handleRemoveBlog = () => {};

    return (
        <>
            <h2>blogs</h2>
            <div>
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={() => handleLike(blog)}
                        user={user}
                        handleRemoveBlog={() => handleRemoveBlog(blog)}
                    />
                ))}
            </div>
        </>
    );
};

export default BlogList;
