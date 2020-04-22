import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import NewOfferDialog from '../components/newOfferDialog/newOfferDialog';

describe('Testing', () => {

    describe('text', () => {

        const title = 'Neue Offerte erstellen';
        const text = 'Tragen Sie bitte alle Felder ein, um eine neue Offerte zu erstellen.';

        it('renders the given title', () => {
            const { getByText } = render(
                <NewOfferDialog
                    show={true}
                />
            );
            expect(getByText(title)).toBeInTheDocument();
        });

        it('renders the given text', () => {

            const { getByText } = render(
                <NewOfferDialog
                    show={true}
                />
            );
            expect(getByText(text)).toBeInTheDocument();
        });

    });

});