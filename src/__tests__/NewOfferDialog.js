import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import NewOfferDialog from '../components/newOfferDialog/newOfferDialog';

describe('Testing', () => {


    describe('hardcoded text', () => {
        it('renders the hardcoded text', () => {
            const { getByText } = render(
                <NewOfferDialog
                    show={true}
                />
            );
            expect(getByText("Neue Offerte erstellen")).toBeInTheDocument();
            expect(getByText("Tragen Sie bitte alle Felder ein, um eine neue Offerte zu erstellen.")).toBeInTheDocument();
        });
    });

    
    describe('Text input fields', () => {

        it('should render them all', () => {
            const { getByText } = render(
                <NewOfferDialog
                    show={true}
                />
            );
            expect(getByText("Offertenbezeichnung")).toBeInTheDocument();
            expect(getByText("Beschreibung")).toBeInTheDocument();
        });

        it('should all be enabled', () => {
            const { getAllByRole } = render(
                <NewOfferDialog
                    show={true}
                />
            );
            const inputFields = getAllByRole("textbox");
            inputFields.map(entry => expect(entry.disabled).toBe(false));
        });

        it('should be required', () => {
            const { getAllByRole } = render(
                <NewOfferDialog
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
                <NewOfferDialog
                    onCancel={onCancelSpy}
                    show={true}
                />
            );
            getByText('Abbrechen').dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onCancelSpy).toHaveBeenCalled();
        })

        it('should call onSubmit when submit is pressed', () => {
            const onSubmitSpy = jest.fn();
            const component = mount(<NewOfferDialog
                onSubmit={onSubmitSpy}
                show={true}
            />);
            component.find('form').simulate('submit');
            expect(onSubmitSpy).toHaveBeenCalled();
        });

        it('should create the correct JSON payload', () => {
            const onSubmitSpy = jest.fn();

            const offerName = "offer name one";
            const description = "This is the best test there has ever been, just look at this beauty!";

            const component = mount(<NewOfferDialog
                onSubmit={onSubmitSpy}
                show={true}
            />);

            //Attention, you need to skip 1 per textarea because Material-ui renders 2 textareas, but one is hidden!
            component.find('textarea').at(0).instance().value = offerName; 
            component.find('textarea').at(2).instance().value = description;
            component.find('form').simulate('submit');

            expect(onSubmitSpy).toHaveBeenCalled();
            expect(onSubmitSpy.mock.calls[0][0]).toStrictEqual(
                {
                    offername: offerName,
                    description: description
                }
            );

        });

    });

});