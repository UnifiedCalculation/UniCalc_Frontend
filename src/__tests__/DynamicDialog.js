import React from 'react';
import { render } from '@testing-library/react';
import DynamicDialog from '../components/dynamicDialog/dynamicDialog';
import TextField from '@material-ui/core/TextField';

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

            const textFields = [
                {
                    id: 'name',
                    label: 'Projektname',
                    type: 'textarea',
                    required: true
                },
                {
                    id: 'address',
                    label: 'Adresse',
                    type: 'textarea',
                    required: true
                },
                {
                    id: 'city',
                    label: 'Stadt',
                    type: 'textarea',
                    required: true
                },
                {
                    id: 'description',
                    label: 'Beschreibung',
                    type: 'textarea',
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

                const { getByRole, getAllByRole } = render(
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
        });
    });


});
