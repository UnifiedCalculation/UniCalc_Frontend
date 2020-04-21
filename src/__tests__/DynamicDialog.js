import React from 'react';
import { render } from '@testing-library/react';
import DynamicDialog from '../components/dynamicDialog/dynamicDialog';
import TextField from '@material-ui/core/TextField';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';

describe('Testing', () => {


    describe('text parameters', () => {
        it('renders the given title', () => {
            const { getByText } = render(
                <DynamicDialog
                    show={true}
                    title={"TestingTitle123"}
                />
            );
            expect(getByText("TestingTitle123")).toBeInTheDocument();
        });

        it('renders the given text', () => {
            const exampleText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."


            const { getByText } = render(
                <DynamicDialog
                    show={true}
                    text={exampleText}
                />
            );
            expect(getByText(exampleText)).toBeInTheDocument();
        });
    });

    describe('buttons', () => {
        it('renders the buttons', () => {
            const { getByText } = render(
                <DynamicDialog
                    show={true}
                    acceptButtonText={"Accept"}
                    cancelButtonText={"Cancel"}
                />
            );
            expect(getByText("Accept")).toBeInTheDocument();
            expect(getByText("Cancel")).toBeInTheDocument();
        });

        it('doesnt render the cancel button', () => {
            const { getByText, getAllByRole } = render(
                <DynamicDialog
                    show={true}
                    acceptButtonText={"Accept"}
                />
            );
            expect(getByText("Accept")).toBeInTheDocument();
            expect(getAllByRole("button").length).toEqual(1);
        });
    });

    describe('functions', () => {
        const buttonText = "buttonText";

        it('calls the onAccept function when the Accept button is pressed', () => {
            const onAcceptSpy = jest.fn();

            const { getByText } = render(
                <DynamicDialog
                    show={true}
                    acceptButtonText={buttonText}
                    onAccept={onAcceptSpy}
                />
            );
            getByText(buttonText).dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onAcceptSpy).toHaveBeenCalled();
        });

        it('calls the onCancel function when the Cancel button is pressed', () => {
            const onCancelSpy = jest.fn();

            const { getByText } = render(
                <DynamicDialog
                    show={true}
                    cancelButtonText={buttonText}
                    onCancel={onCancelSpy}
                />
            );
            getByText(buttonText).dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onCancelSpy).toHaveBeenCalled();
        });

    });

    describe('children', () => {
        it('renders the given children correctly', () => {
            const { getByText, getAllByRole } = render(
                <DynamicDialog
                    show={true}
                >
                    <p>This is an example child</p>
                </DynamicDialog>
            );
            expect(getByText("This is an example child")).toBeInTheDocument();
        });



        describe('forms', () => {

            Enzyme.configure({ adapter: new Adapter() });

            const textFields = [
                {
                    id: 'name',
                    label: 'Projektname',
                    type: 'textarea',
                    value: 'NameForThisField',
                    required: true
                },
                {
                    id: 'address',
                    label: 'Adresse',
                    type: 'textarea',
                    value: 'adressThatTotallyExistsLikeThis q23-123a',
                    required: true
                },
                {
                    id: 'city',
                    label: 'Stadt',
                    type: 'textarea',
                    value: 'bestCityEver',
                    required: true
                },
                {
                    id: 'description',
                    label: 'Beschreibung',
                    type: 'textarea',
                    value: 'This is a long descirption that works pretty well. It might even support weird stuff like äöü $¨0 and 😎',
                    required: true
                }
            ];

            const inputFields = textFields.map((entry, index) => {
                return <TextField
                    type={entry.type}
                    id={entry.id}
                    name={entry.id}
                    key={index + '-textField'}
                    label={entry.label}
                    required={entry.required}
                    fullWidth
                    multiline={entry.type !== "email" && entry.type !== "number"}
                    margin='dense'
                />
            });


            it('renders the given input fields with the correct settings', () => {
                const { getAllByRole } = render(
                    <DynamicDialog
                        show={true}
                    >
                        {inputFields}
                    </DynamicDialog>
                );
                const renderedFields = getAllByRole("textbox");
                expect(renderedFields.length).toBe(textFields.length);

                renderedFields.map((entry, index) => {
                    expect(entry.id).toBe(textFields[index].id)
                    expect(entry.type).toBe(textFields[index].type)
                    expect(entry.required).toBe(textFields[index].required)
                });
            });

            it('return the correct JSON of the form', () => {
                const onSubmitSpy = jest.fn();

                const component = mount(
                    <DynamicDialog
                        show={true}
                        onAccept={onSubmitSpy}
                    >
                        {inputFields}
                    </DynamicDialog>
                );

                //Attention, you need to skip 1 per textarea because Material-ui renders 2 textareas, but one is hidden!
                component.find('textarea').at(0).instance().value = textFields[0].value; // 
                component.find('textarea').at(2).instance().value = textFields[1].value; //
                component.find('textarea').at(4).instance().value = textFields[2].value; //
                component.find('textarea').at(6).instance().value = textFields[3].value; //
                component.find('form').simulate('submit');

                expect(onSubmitSpy).toHaveBeenCalled();
                expect(onSubmitSpy.mock.calls[0][0]).toStrictEqual(
                    {
                        name: textFields[0].value,
                        address: textFields[1].value,
                        city: textFields[2].value,
                        description: textFields[3].value
                    }
                );
            })
        });
    });


});
