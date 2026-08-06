const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, addNewBlog } = require('./helper');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/test/reset');
        await request.post('/api/users', {
            data: {
                name: 'Andrzej Jejkowski',
                username: 'jejek',
                password: 'kejej123',
            },
        });

        await page.goto('/');
    });

    test('Login form is shown', async ({ page }) => {
        const usernameInput = page.getByLabel('username');
        const passwordInput = page.getByLabel('password');
        const loginButton = page.getByRole('button', { name: 'login' });
        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'jejek', 'kejej123');

            await expect(
                page.getByText('Andrzej Jejkowski is logged in'),
            ).toBeVisible();
        });

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'user', 'user123');

            await expect(page.getByText('wrong credentials')).toBeVisible();
        });
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'jejek', 'kejej123');
        });

        test('a new blog can be created', async ({ page }) => {
            await addNewBlog(
                page,
                'Lord of the rings',
                'LOTR.com',
                'JRR Tolkien',
            );

            await expect(page.getByText('Lord of the rings')).toBeVisible();
        });

        describe('and a note exist', () => {
            beforeEach(async ({ page }) => {
                await addNewBlog(
                    page,
                    'Lord of the rings',
                    'LOTR.com',
                    'JRR Tolkien',
                );
            });

            test('user can add like to the blog', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click();
                await page.getByRole('button', { name: 'like' }).click();
                await expect(page.getByText('likes 1 ')).toBeVisible();
                await page.getByRole('button', { name: 'like' }).click();
                await expect(page.getByText('likes 2 ')).toBeVisible();
            });
        });
    });
});
