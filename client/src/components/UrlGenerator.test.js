import { UrlGenerator } from "./UrlGenerator";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

test('It should show the warning text after submitting an empty URL', async () => {
    render(<UrlGenerator/>)
    userEvent.click(screen.getByText('Generate'));
    const warningElement = screen.getByText('Invalid URL');
    expect(warningElement.style.display).toBe('flex');
})