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
        entries: []
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

        it('renders the correct buttons in an empty offer', async () => {
            const { getByTestId, queryByText, getByText } = render(
                <OfferDisplay offer={emptyOffer} />
            );

            await waitForElement(() => getByTestId('offerDisplay-container'));


            expect(queryByText("Neuen Artikel hinzufügen")).toBeNull();
            expect(getByText("Offerte speichern")).toBeInTheDocument();
            expect(getByText("Offerte als PDF laden")).toBeInTheDocument();
            expect(getByText("Neuen Segment hinzufügen")).toBeInTheDocument();

        });

        it('renders the correct buttons in an existing offer', async () => {
            const { getByTestId, getByText } = render(
                <OfferDisplay offer={offer} />
            );

            await waitForElement(() => getByTestId('offerDisplay-container'));

            expect(getByText("Neuen Artikel hinzufügen")).toBeInTheDocument();
            expect(getByText("Offerte speichern")).toBeInTheDocument();
            expect(getByText("Offerte als PDF laden")).toBeInTheDocument();
            expect(getByText("Neuen Segment hinzufügen")).toBeInTheDocument();

        });

    });

    describe('functionality', () => {

        const projectId = 123456;
        const postUrl = "projects/" + projectId + "/offers";

        it('should start a post request to save an offer', async () => {

            const { getByTestId, getByText } = render(
                <OfferDisplay projectId={projectId} offer={emptyOffer} />
            );

            await waitForElement(() => getByTestId('offerDisplay-container'))


            fireEvent.click(getByText('Offerte speichern'));

            expect(axios.post).toHaveBeenCalledWith(postUrl, emptyOffer);
        });

        describe('new segments', () => {

            it('should create a new segment in an empty offer and save it', async () => {

                const segmentName = "New testing segment 😎";
                let emptyOfferWithNewSegment =  emptyOffer;
                emptyOfferWithNewSegment.entries.push({
                    name: segmentName,
                    discount: null,
                    articles: []
                });

                const { getByTestId, getByText } = render(
                    <OfferDisplay projectId={projectId} offer={emptyOffer} />
                );
    
                await waitForElement(() => getByTestId('offerDisplay-container'))
    
                fireEvent.click(getByText('Neuen Segment hinzufügen'));
                fireEvent.change(getByTestId('newSegment-testing-name'), segmentName);
                fireEvent.click(getByText('Annehmen'));

                fireEvent.click(getByText('Offerte speichern'));
                expect(axios.post).toHaveBeenCalledWith(postUrl, emptyOfferWithNewSegment);

            });

            it('should create multiple new segments with discounts in an empty offer and save it', async () => {

                const newSegments = [
                    {
                        name: "new segment 1",
                        discount: null
                    },
                    {
                        name: "new discounted segment 1",
                        discount: 12.5
                    },
                    {
                        name: "new discounted segment 2",
                        discount: 75.73
                    },
                    {
                        name: "😎👉",
                        discount: null
                    }
                ]
                let emptyOfferWithNewSegment =  emptyOffer;
                emptyOfferWithNewSegment.entries = newSegments;

                const { getByTestId, getByText } = render(
                    <OfferDisplay projectId={projectId} onClose={(offer) => emptyOffer = offer} offer={emptyOffer} />
                );
    
                await waitForElement(() => getByTestId('offerDisplay-container'))
    
                newSegments.map(entry => {
                    fireEvent.click(getByText('Neuen Segment hinzufügen'));
                    fireEvent.change(getByTestId('newSegment-testing-name'), entry.name);
                    if(entry.discount) fireEvent.change(getByTestId('newSegment-testing-discount'), entry.discount);
                    fireEvent.click(getByText('Annehmen'));
                });

                fireEvent.click(getByText('Offerte speichern'));
                expect(axios.post).toHaveBeenCalledWith(postUrl, emptyOfferWithNewSegment);

            });

        });
    });

});
