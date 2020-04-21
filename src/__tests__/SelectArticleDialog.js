import React from 'react';
import { render } from '@testing-library/react';
import SelectArticleDialog from '../components/selectArticleDialog/selectArticleDialog';

describe('Testing', () => {

    describe('text', () => {

        const title = 'Artikel hinzufügen';
        const text = 'Alle Felder eintragen, um einen Artikel hinzuzufügen.';

        it('renders the given title', () => {
            const { getByText } = render(
                <SelectArticleDialog
                    show={true}
                />
            );
            expect(getByText(title)).toBeInTheDocument();
        });

        it('renders the given text', () => {

            const { getByText } = render(
                <SelectArticleDialog
                    show={true}
                />
            );
            expect(getByText(text)).toBeInTheDocument();
        });

    });

});