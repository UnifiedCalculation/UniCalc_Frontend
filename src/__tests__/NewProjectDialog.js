import React from 'react';
import { render, getAllByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import NewProjectDialog from '../components/newProjectDialog/newProjectDialog';

describe('Testing', () => {

    const customers = [
        {
            name: "Name one",
            customer_id: 1234
        },
        {
            name: "Name two",
            customer_id: 1235
        },
        {
            name: "Name three",
            customer_id: 1236
        }
    ]

    describe('hardcoded text', () => {
        it('renders the hardcoded text', () => {
            const { getByText } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            expect(getByText("Neues Projekt erstellen")).toBeInTheDocument();
            expect(getByText("Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.")).toBeInTheDocument();
        });
    });

    describe('selector', () => {

        it('renders', () => {
            const { getByRole } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            expect(getByRole("combobox")).toBeInTheDocument();
        });

        it('creates the correct amount of options for the selector', () => {
            const { getByRole } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            expect(getByRole("combobox").children.length).toEqual(customers.length + 1);
        });

        it('creates the values in the options correctly', () => {
            const { getByRole } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );

            const options = getByRole("combobox").children;
            expect(options[1].value).toEqual("1234");
            expect(options[1].textContent).toEqual("Name one");
            expect(options[2].value).toEqual("1235");
            expect(options[2].textContent).toEqual("Name two");
            expect(options[3].value).toEqual("1236")
            expect(options[3].textContent).toEqual("Name three")
        });

        it('creates an additional empty option at the beginning of the array for the selector', () => {
            const { getByRole } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            expect(getByRole("combobox").children[0].value).toBe("");
        });

        it('creates an additional empty option at the beginning of the array for the selector even without any customers', () => {
            const { getByRole } = render(
                <NewProjectDialog
                    customers={[]}
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
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            expect(getByText("Projektname")).toBeInTheDocument();
            expect(getByText("Adresse")).toBeInTheDocument();
            expect(getByText("Postleitzahl")).toBeInTheDocument();
            expect(getByText("Stadt")).toBeInTheDocument();
            expect(getByText("Beschreibung")).toBeInTheDocument();
        });

        it('should all be enabled', () => {
            const { getAllByRole } = render(
                <NewProjectDialog
                    customers={customers}
                    show={true}
                />
            );
            const inputFields = getAllByRole("textbox");
            inputFields.map(entry => expect(entry.disabled).toBe(false));
        });

        it('should be required', () => {
            const { getAllByRole } = render(
                <NewProjectDialog
                    customers={customers}
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
                <NewProjectDialog
                    customers={customers}
                    onCancel={onCancelSpy}
                    show={true}
                />
            );
            getByText('Abbrechen').dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onCancelSpy).toHaveBeenCalled();
        })

        it('should call onSubmit when submit is pressed', () => {
            const onSubmitSpy = jest.fn();
            const component = mount(<NewProjectDialog
                customers={customers}
                onSubmit={onSubmitSpy}
                show={true}
            />);
            component.find('form').simulate('submit');
            expect(onSubmitSpy).toHaveBeenCalled();
        });

        it('should create the correct JSON payload', () => {
            const onSubmitSpy = jest.fn();

            const projectName = "project name one";
            const address = "NewStreetSomewhere 123ab";
            const zipCode = "asdi-12899";
            const city = "FlavourTown";
            const description = "This is the best test there has ever been, just look at this beauty!";

            const component = mount(<NewProjectDialog
                customers={customers}
                onSubmit={onSubmitSpy}
                show={true}
            />);

            //Attention, you need to skip 1 per textarea because Material-ui renders 2 textareas, but one is hidden!
            component.find('option').at(1).instance().selected = true; //
            component.find('textarea').at(0).instance().value = projectName; // 
            component.find('textarea').at(2).instance().value = address; //
            component.find('textarea').at(4).instance().value = zipCode; //
            component.find('textarea').at(6).instance().value = city; //
            component.find('textarea').at(8).instance().value = description; //
            component.find('form').simulate('submit');

            expect(onSubmitSpy).toHaveBeenCalled();
            expect(onSubmitSpy.mock.calls[0][0]).toStrictEqual(
                {
                    customer_id: customers[0].customer_id.toString(),
                    projectname: projectName,
                    adress: address,
                    zipcode: zipCode,
                    city: city,
                    description: description
                }
            );

        });

    });

});