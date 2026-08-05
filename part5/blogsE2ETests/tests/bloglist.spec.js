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
        const usernameInput = await page.getByLabel('username');
        const passwordInput = await page.getByLabel('password');
        const loginButton = await page.getByRole('button', { name: 'login' });
        expect(usernameInput).toBeVisible();
        expect(passwordInput).toBeVisible();
        expect(loginButton).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'jejek', 'kejej123');

            expect(
                await page.getByText('Andrzej Jejkowski is logged in'),
            ).toBeVisible();
        });

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'user', 'user123');

            expect(await page.getByText('wrong credentials')).toBeVisible();
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

            expect(await page.getByText('Lord of the rings')).toBeVisible();
        });
    });
});
