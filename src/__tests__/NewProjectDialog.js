import React from 'react';
import { render } from '@testing-library/react';
import NewProjectDialog from '../components/newProjectDialog/newProjectDialog';

describe('Testing', () => {

    describe('text', () => {

        const title = 'Neues Projekt erstellen';
        const text = 'Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.';

        it('renders the given title', () => {
            const { getByText } = render(
                <NewProjectDialog
                    show={true}
                />
            );
            expect(getByText(title)).toBeInTheDocument();
        });

        it('renders the given text', () => {

            const { getByText } = render(
                <NewProjectDialog
                    show={true}
                />
            );
            expect(getByText(text)).toBeInTheDocument();
        });

    });

});