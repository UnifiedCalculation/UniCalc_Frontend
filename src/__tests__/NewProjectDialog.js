import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../components/alert/alert';

describe('Customers', () => {

    const customers = [
        {
            name: 'Albert Einstein',
            customerId: '1237120'
        },
        {
            name: 'Ferdinand Fritz',
            customerId: '1237230'
        },
        {
            name: 'Person X',
            customerId: '1237540'
        }
    ];

    it('renders standard accept button text', () => {
        const { getByText } = render(<Alert show={true} />);
        expect(getByText(Alert.defaultProps.acceptText)).toBeInTheDocument();
    });

    it('renders the standard cancel button text if a cancel function is supplied', () => {
        const { getByText } = render(<Alert onCancel={() => console.log('testing')} show={true} />);
        expect(getByText(Alert.defaultProps.cancelText)).toBeInTheDocument();
    });

    it('Does not render the cancel button if no cancel function is supplied', () => {
        const { queryByText } = render(<Alert show={true} />);
        expect(queryByText(Alert.defaultProps.cancelText)).toBeNull()
    });

    describe('Button functions', () => {

        it('Should call the onAccept function when the accept button is pressed', () => {
            const onAcceptSpy = jest.fn();
            const { getByText } = render(<Alert onAccept={onAcceptSpy} show={true} />);
            getByText(Alert.defaultProps.acceptText).dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onAcceptSpy).toHaveBeenCalled();
        });

        it('Should call the onCancel function when the cancel button is pressed', () => {
            const onCancelSpy = jest.fn();
            const { getByText } = render(<Alert onCancel={onCancelSpy} show={true} />);
            getByText(Alert.defaultProps.cancelText).dispatchEvent(new MouseEvent("click", { bubbles: true }));
            expect(onCancelSpy).toHaveBeenCalled();
        });

    });

});

describe('Textfields', () => {

    it('renders the title correctly', () => {
        const title = 'titleRenderText';
        const { getByText } = render(<Alert title={title} show={true} />);
        expect(getByText(title)).toBeInTheDocument();
    });

    it('renders the text correctly', () => {
        const text = 'This is some arbitrary text';
        const { getByText } = render(<Alert text={text} show={true} />);
        expect(getByText(text)).toBeInTheDocument();
    });

    it('render special chars correctly', () => {
        const text = 'öäü£!àè`?^😀';
        const { getByText } = render(<Alert text={text} show={true} />);
        expect(getByText(text)).toBeInTheDocument();
    });

});
