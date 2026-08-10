import { screen, render } from '@testing-library/react';
import Togglable from './Togglable';
import userEvent from '@testing-library/user-event';

describe('<Togglable />', () => {
    beforeEach(() => {
        render(
            <Togglable buttonLabel="show...">
                <div>togglable content</div>
            </Togglable>,
        );
    });

    test('renders its children', () => {
        screen.getByText('togglable content');
    });

    test('at start the children are not displayed', () => {
        const element = screen.getByText('togglable content');
        expect(element).not.toBeVisible();
    });

    test('after clicking the button, children are displayed', async () => {
        // given
        const user = userEvent.setup();
        const button = screen.getByText('show...');

        // when
        await user.click(button);

        // then
        const element = screen.getByText('togglable content');
        expect(element).toBeVisible();
    });

    test('toggled content can be closed', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('show...');
        await user.click(button);

        const closeButton = screen.getByText('cancel');
        await user.click(closeButton);

        const element = screen.getByText('togglable content');
        expect(element).not.toBeVisible();
    });
});
