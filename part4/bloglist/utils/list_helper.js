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

const mostBlogs = (blogs) => {
    const authorBlogs = new Map();

    for (const blog of blogs) {
        const author = blog.author;
        authorBlogs.set(author, (authorBlogs.get(author) || 0) + 1);
    }

    let maximumBlogs = 0;
    let authorWithMostBlogs = null;

    for (const [author, numberOfTheirBlogs] of authorBlogs) {
        if (numberOfTheirBlogs > maximumBlogs) {
            maximumBlogs = numberOfTheirBlogs;
            authorWithMostBlogs = author;
        }
    }

    return { author: authorWithMostBlogs, blogs: maximumBlogs };
};

const mostLikes = (blogs) => {
    const authorLikes = new Map();

    for (const blog of blogs) {
        const author = blog.author;
        authorLikes.set(author, (authorLikes.get(author) || 0) + blog.likes);
    }

    let maximumLikes = 0;
    let authorWithMostLikes = null;

    for (const [author, likes] of authorLikes) {
        if (likes > maximumLikes) {
            maximumLikes = likes;
            authorWithMostLikes = author;
        }
    }

    return { author: authorWithMostLikes, likes: maximumLikes };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
