import React from 'react';
import { render } from '@testing-library/react';
import NewProjectDialog from '../components/newProjectDialog/newProjectDialog';

describe('Rendering', () => {

    const customers = [
        {
            name: "Name one",
            customerId: 1234
        },
        {
            name: "Name two",
            customerId: 1235
        },
        {
            name: "Name three",
            customerId: 1236
        }
    ]

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

    it('renders the selector', () => {
        const { getByText, getByTestId, getByRole } = render(
            <NewProjectDialog
                customers={customers}
                show={true}
            />
        );
        expect(getByRole("combobox")).toBeInTheDocument();
    });

    it('renders the correct amount of options for the selector', () => {
        const { getByText, getByTestId, getByRole } = render(
            <NewProjectDialog
                customers={customers}
                show={true}
            />
        );
        expect(getByRole("combobox").children.length).toEqual(customers.length + 1);
    });

    it('renders an additional empty option at the beginning of the array for the selector', () => {
        const { getByText, getByTestId, getByRole } = render(
            <NewProjectDialog
                customers={customers}
                show={true}
            />
        );
        expect(getByRole("combobox").children[0].value).toBe("");
    });

    it('renders an additional empty option at the beginning of the array for the selector even without any customers', () => {
        const { getByText, getByTestId, getByRole } = render(
            <NewProjectDialog
                customers={[]}
                show={true}
            />
        );
        
        expect(getByRole("combobox").children.length).toEqual(1);
        expect(getByRole("combobox").children[0].value).toBe("");
    });


});