import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import SelectArticleDialog from '../components/selectArticleDialog/selectArticleDialog';

describe('Testing', () => {

    const articles = [
        {
            name: "Steckdose T13 3-fach UP weiss",
            article_id: 1234123,
            unit: "Stk.",
            price: 125.80,
        },
        {
            name: "Steckdose T13 3-fach AP weiss",
            article_id: 1234123,
            unit: "Stk.",
            price: 220.25,
        }
    ]

    describe('hardcoded text', () => {
        it('renders the hardcoded text', () => {
            const { getByText } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            expect(getByText("Artikel hinzufügen")).toBeInTheDocument();
            expect(getByText("Alle Felder eintragen, um einen Artikel hinzuzufügen.")).toBeInTheDocument();
        });
    });

    describe('selector', () => {

        it('renders', () => {
            const { getByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            expect(getByRole("combobox")).toBeInTheDocument();
        });

        it('creates the correct amount of options for the selector', () => {
            const { getByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            expect(getByRole("combobox").children.length).toEqual(articles.length + 1);
        });

        it('creates the values in the options correctly', () => {
            const { getByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );

            const options = getByRole("combobox").children;
            expect(options[1].value).toEqual(articles[0].article_id.toString());
            expect(options[1].textContent).toEqual(articles[0].name);
            expect(options[2].value).toEqual(articles[1].article_id.toString());
            expect(options[2].textContent).toEqual(articles[1].name);
        });

        it('creates an additional empty option at the beginning of the array for the selector', () => {
            const { getByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            expect(getByRole("combobox").children[0].value).toBe("");
        });

        it('creates an additional empty option at the beginning of the array for the selector even without any customers', () => {
            const { getByRole } = render(
                <SelectArticleDialog
                    articles={[]}
                    show={true}
                />
            );

            expect(getByRole("combobox").children.length).toEqual(1);
            expect(getByRole("combobox").children[0].value).toBe("");
        });
    });

    describe('Text input fields', () => {

        it('should render them all', () => {
            const { getByText } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            expect(getByText("Artikel")).toBeInTheDocument();
            expect(getByText("Anzahl")).toBeInTheDocument();
            expect(getByText("Rabatt in Prozent")).toBeInTheDocument();
            expect(getByText("Beschreibung")).toBeInTheDocument();
        });

        it('should all be enabled', () => {
            const { getAllByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            const inputFields = getAllByRole("textbox");
            inputFields.map(entry => expect(entry.disabled).toBe(false));
        });

        it('should be required', () => {
            const { getAllByRole } = render(
                <SelectArticleDialog
                    articles={articles}
                    show={true}
                />
            );
            const inputFields = getAllByRole("textbox");
            inputFields.map(entry => expect(entry.required).toBe(true));
        });
    });

    describe('functions are called correctly', () => {

        Enzyme.configure({ adapter: new Adapter() });

        it('should call onCancel when cancel is pressed', () => {
            const onCancelSpy = jest.fn();
            const { getByText } = render(
                <SelectArticleDialog
                    articles={articles}
                    onCancel={onCancelSpy}
                    show={true}
                />
            );
            getByText('Abbrechen').dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onCancelSpy).toHaveBeenCalled();
        })

        it('should call onSubmit when submit is pressed', () => {
            const onSubmitSpy = jest.fn();
            const component = mount(<SelectArticleDialog
                articles={articles}
                onSubmit={onSubmitSpy}
                show={true}
            />);
            component.find('form').simulate('submit');
            expect(onSubmitSpy).toHaveBeenCalled();
        });

        it('should create the correct JSON payload', () => {
            const onSubmitSpy = jest.fn();

            const amount = 12;
            const discount = 7.856;
            const description = "This is the best test there has ever been, just look at this beauty!";

            const component = mount(<SelectArticleDialog
                articles={articles}
                onSubmit={onSubmitSpy}
                show={true}
            />);

            //Attention, you need to skip 1 per textarea because Material-ui renders 2 textareas, but one is hidden!
            component.find('option').at(1).instance().selected = true;
            component.find('textarea').at(0).instance().value = amount;
            component.find('textarea').at(2).instance().value = discount;
            component.find('textarea').at(4).instance().value = description;
            component.find('form').simulate('submit');

            expect(onSubmitSpy).toHaveBeenCalled();
            expect(onSubmitSpy.mock.calls[0][0]).toStrictEqual(
                {
                    article_id: articles[0].article_id.toString(),
                    amount: amount.toString(),
                    discount: discount.toString(),
                    description: description
                }
            );

        });

    });

});