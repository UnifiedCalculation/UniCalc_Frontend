import React from 'react';
import { render, fireEvent, waitForElement, getByTestId, cleanup } from '@testing-library/react';
import OfferDisplay from '../components/offerDisplay/offerDisplay';
import axios from 'axios';

jest.mock('axios');
afterAll(cleanup)
afterEach(() => {
  jest.clearAllMocks() // clear axios mocks after each test
})


describe('Testing', () => {

    axios.post.mockResolvedValue();

    const articles = [
        {
            name: "Steckdose T13 3-fach UP weiss",
            article_id: 1234123,
            unit: "Stk.",
            price: 125.80,
        },
        {
            name: "Steckdose T13 3-fach AP weiss",
            article_id: 1234124,
            unit: "Stk.",
            price: 220.25,
        }
    ]

    axios.get.mockResolvedValue({ data: articles });

    const emptyOffer = {
        name: "emptyOffer",
        entries: [],
        id: 123456,
    };

    const offer = {
        name: "offer 1",
        id: 1234512,
        entries: [
            {
                name: "badezimmer",
                discount: null,
                articles: [
                    {
                        name: "Steckdose T13 3-fach UP weiss",
                        article_id: 1234123,
                        unit: "Stk.",
                        price: 125.80,
                        amount: 15,
                        discount: null
                    },
                    {
                        name: "Steckdose T13 3-fach AP weiss",
                        article_id: 1234124,
                        unit: "Stk.",
                        price: 220.25,
                        amount: 120,
                        discount: 7.35
                    }
                ]
            }
        ]
    }

    describe('buttons', () => {


        it('renders the correct buttons in an existing offer', async () => {
            const { getByTestId, getByText } = render(
                <OfferDisplay offerData={offer} onError={console.log}/>
            );

            await waitForElement(() => getByTestId('offerDisplay-header'));

            expect(getByText("Offerte als PDF laden")).toBeInTheDocument();
            expect(getByText("Neues Segment hinzufügen")).toBeInTheDocument();
            expect(getByText("Offerte Löschen")).toBeInTheDocument();
            expect(getByText("Offerte zu Auftrag umwandeln")).toBeInTheDocument();

        });

    });

});
