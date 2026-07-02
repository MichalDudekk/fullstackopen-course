const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => sum + blog.likes;

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    let maximum = 0;
    let result = null;

    for (const blog of blogs) {
        if (blog.likes > maximum) {
            maximum = blog.likes;
            result = blog;
        }
    }

    return result;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
