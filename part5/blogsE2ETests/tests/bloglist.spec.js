const { test, expect, beforeEach, describe } = require('@playwright/test');

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
            await page.getByLabel('username').fill('jejek');
            await page.getByLabel('password').fill('kejej123');
            const loginButton = await page
                .getByRole('button', {
                    name: 'login',
                })
                .click();

            expect(
                await page.getByText('Andrzej Jejkowski is logged in'),
            ).toBeVisible();
        });

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('user');
            await page.getByLabel('password').fill('user123');
            const loginButton = await page
                .getByRole('button', {
                    name: 'login',
                })
                .click();

            expect(await page.getByText('wrong credentials')).toBeVisible();
        });
    });
});
