const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    test('Login form is shown', async ({ page }) => {
        const usernameInput = await page.getByLabel('username');
        const passwordInput = await page.getByLabel('password');
        const loginButton = await page.getByRole('button', { name: 'login' });
        expect(usernameInput).toBeVisible();
        expect(passwordInput).toBeVisible();
        expect(loginButton).toBeVisible();
    });
});
