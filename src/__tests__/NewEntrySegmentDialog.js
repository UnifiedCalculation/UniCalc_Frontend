import React from 'react';
import { render } from '@testing-library/react';
import NewEntrySegmentDialog from '../components/newEntrySegmentDialog/newEntrySegmentDialog';

describe('Testing', () => {

    describe('text', () => {

        const title = 'Neues Segment erstellen';
        const text = 'Tragen Sie bitte alle Felder ein, um ein neues Segment zu erstellen.';

        it('renders the given title', () => {
            const { getByText } = render(
                <NewEntrySegmentDialog
                    show={true}
                />
            );
            expect(getByText(title)).toBeInTheDocument();
        });

        it('renders the given text', () => {

            const { getByText } = render(
                <NewEntrySegmentDialog
                    show={true}
                />
            );
            expect(getByText(text)).toBeInTheDocument();
        });

    });

});