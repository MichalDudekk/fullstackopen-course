const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button', { name: 'login' }).click();
};

const addNewBlog = async (page, title, url, author) => {
    await page.getByRole('button', { name: 'create new note' }).click();
    await page.getByLabel('title:').fill(title);
    await page.getByLabel('url:').fill(url);
    await page.getByLabel('author:').fill(author);
    await page.getByRole('button', { name: 'create' }).click();
    await page.getByText(title).waitFor();
};

module.exports = { loginWith, addNewBlog };
